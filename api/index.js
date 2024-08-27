const express = require('express'); 
const cors = require('cors'); 
const app = express(); 
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require ('./models/post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs')


const uploadMiddleware = multer({ dest: 'uploads/' });

const salt = bcrypt.genSaltSync(10)
const secret = 'hjscjdschSIPHCdsjcsd51612346';

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://rcharinwolf:rcharinga401981@cluster0.eap27ag.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const {username, password} = req.body
    try {
        const userDoc = await User.create({ 
            username, 
            password: bcrypt.hashSync( password, salt )
        });
        res.json(userDoc)        
    } catch (e) {
        res.status(400).json({error: 'Registration Failed', details: e});
    }
});

app.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    try {
        const userDoc = await User.findOne({username});
        if(!userDoc){
            return res.status(400).json({error: 'User Not found'})
        }
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ username, id:userDoc._id }, secret, {}, (err,token) => {
                if(err) throw err;
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username, 
                });
            });
        } else {
            res.status(400).json({error: 'Wrong Password'})
        }
    } catch (error) {
        res.status(500).json({error: 'Login Falied', details: e})
    }
});

app.get('/profile', (req,res) => {
    const { token } = req.cookies;
    try {
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) return res.status(403).json({error: 'Unathorized'})
            res.json(info)
        })  
        
    } catch (error) {
        res.status(500).json({error: 'Profiled Request Falied', details: e})
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Logged out Successfully')
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    try {
        jwt.verify(token, secret, {}, async(err, info) => {
            if (err) return res.status(403).json({error: 'Unathorized'}) 
            const {title, summary, content} = req.body;
        const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id, 
        });
        res.json({ postDoc })        
        });  
        
    } catch (error) {
        res.status(500).json({error: 'Post Creation Falied', details: e })
    }
 
});

app.put('/post', uploadMiddleware.single('file'), async(req, res) => {
    let newPath = null;
    if (req.file) {
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }
    
    const {token} = req.cookies;
    try {
        jwt.verify(token, secret, {}, async(err, info) => {
            if (err) return res.status(403).json({error: 'Unathorized'});
            const {id, title, summary, content} = req.body;
            const postDoc = await Post.findByIdAndUpdate(id);
            const filter = { _id: id, author: info.id };    
            const update = {
                title,
                summary,
                content,
                cover: newPath ? newPath : postDoc.cover 
            };
            const options = { new: true };
            const updatedPost = await Post.findByIdAndUpdate(filter, update, options).exec();
            
            if (!updatedPost) {
                return res.status(404).json('Post not found or you are not the author');
            }
    
            res.json(updatedPost);
        })
        
    } catch (error) {
        res.status(500).json({error: 'Post Update Falied', details: e})
    }
});

app.delete('/post/:id', async(req, res) => {
    const {token} = req.cookies;
    try {
        jwt.verify(token, secret, {}, async(err, info) =>{
            if (err) return res.status(403).json({error: 'Unathorized'});

            const filter = {_id: req.params.id, author: info.id}
            const postDoc = await Post.findById(req.params.id)

            if(!postDoc){
                return res.status(404).json('Post not Found')
            }
            const deletePost = await Post.findOneAndDelete(filter).exec();

            if(!deletePost){
                return res.status(404).json('Post not found or you are not the author')
            }
            res.json({message: 'Post deleted Successfully'})
        });
    } catch (error) {
        res.status(500).json({error: 'Post Update Falied', details: e})
    }
});


app.get('/post', async(req, res) => {
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20)
    );    
})

app.get('/post/:id', async(req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.listen(4000)

