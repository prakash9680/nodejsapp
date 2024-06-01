const Blog = require('../models/Blog')
const { validationResult } = require('express-validator');
const fs = require('fs');
const { sendResponse } = require('../../services/helper');

const create = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            let tags = req.body.tags
            req.body.tags = (req.body.tags).split(",");
            const blog = new Blog(req.body);
            blog.authorId = req.user._id;
            if (req.file != null) {
                blog.image = req.file.filename;
            }
            blog.save().then((data) => {
                sendResponse(res, 201, 'succes', { blog: data });
            }).catch((error) => {
                sendResponse(res, 400, 'error', error.errors);
            })

        } catch (err) {
            sendResponse(res, 500, 'server error', err);
        }
    } else {
        sendResponse(res, 400, 'validation error', { error: result.errors });
    }
}

const update = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const id = req.params.id
            let formData = req.body;
            if (req.file != null) {
                formData.image = req.file.filename;
            }
            Blog.findOne({ _id: id }).then(async (data) => {
                try {
                    if (req.file != null) {
                        if (req.file.filename != data.image) {
                            let imageName = (data.image).replace(process.env.BLOG_IMAGE_URL, '');
                            if (fs.existsSync(process.env.BLOG_UPLOAD + '/' + imageName)) {
                                fs.unlinkSync(process.env.BLOG_UPLOAD + '/' + imageName, (err) => {
                                    sendResponse(res, 400, 'error file deleting');
                                })
                            }
                        }
                    }
                } catch(error) {
                    
                }
                formData.authorId = data.authorId;
                formData.tags = (formData.tags).split(",");
                const blogUpdate = await Blog.findByIdAndUpdate(id, formData);
                if (blogUpdate) {
                    await blogUpdate.save().then((dataUpdate) => {
                        sendResponse(res, 200, 'updated', dataUpdate);
                    }).catch((error) => {
                        sendResponse(res, 400, 'error', error.errors);
                    })
                }
            }).catch((error) => {
                sendResponse(res, 500, 'server error', error);
            })
        } catch (err) {
            sendResponse(res, 500, 'server error', err);
        }
    } else {
        sendResponse(res, 400, 'validation error', { error: result.errors });
    }
}
const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id

        if (id != null) {
            await Blog.findByIdAndDelete(id)
                .then(async blog => {
                    if (blog) {
                        let imageName = (blog.image).replace(process.env.BLOG_IMAGE_URL, '');
                        if (fs.existsSync(process.env.BLOG_UPLOAD + '/' + imageName)) {
                            fs.unlinkSync(process.env.BLOG_UPLOAD + '/' + imageName, (err) => {
                                sendResponse(res, 400, 'error file deleting');
                            })
                        }
                        sendResponse(res, 200, 'Delete succesfully', { blog: blog });

                    } else {
                        sendResponse(res, 400, 'No recors found');
                    }

                })
                .catch(err => {
                    sendResponse(res, 400, 'No recors found');
                });
        }

    } catch (err) {
        sendResponse(res, 500, 'server error', err);
    }
}
const getBlog = async (req, res) => {
    try {
        const id = req.params.id
        Blog.findOne({ _id: id }).then(async (data) => {
            if (data) {
                sendResponse(res, 200, 'success', data);
            } else {
                sendResponse(res, 400, 'no data found');
            }
        }).catch(error => {
            sendResponse(res, 400, 'no data found');
        });

    } catch (err) {
        sendResponse(res, 500, 'server error', err);
    }
}
const getBlogList = async (req, res) => {
    try {
        //const id = req.params.id
        Blog.find({ authorId: req.user._id }).then(async (data) => {
            if (data) {
                sendResponse(res, 200, 'success', data);
            } else {
                sendResponse(res, 400, 'no data found', errors);
            }
        }).catch(error => {
            sendResponse(res, 400, 'no data found', error.errors);
        });

    } catch (err) {
        sendResponse(res, 500, 'server error', err.errors);
    }
}


module.exports = { create, update, deleteBlog, getBlog, getBlogList }