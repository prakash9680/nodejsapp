const Comment = require('../models/Comment')
const { validationResult } = require('express-validator');
const fs = require('fs');
const { sendResponse } = require('../../services/helper');

const addComment = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const comment = new Comment(req.body);
            comment.authorId = req.user._id;
            comment.blogPostId = req.params.id;
            comment.created_at = new Date();
            comment.save().then((data) => {
                sendResponse(res, 201, 'succes', { user: data });
            }).catch((error) => {
                sendResponse(res, 400, 'error', error.errors);
            })

        } catch (err) {
            sendResponse(res, 500, 'server error', err);
        }
    } else {
        sendResponse(res, 400, 'validation error', { error: result });
    }
}

const deleteComment = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const id = req.params.commentId

            if (id != null) {
                await Comment.findByIdAndDelete(id)
                    .then(async comment => {
                        if (comment) {
                            sendResponse(res, 200, 'Delete succesfully', comment);

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
    } else {
        sendResponse(res, 400, 'validation error', { error: result });
    }
}

const getComment = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            Comment.find({ blogPostId: req.params.id }).then(async (data) => {
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
    } else {
        sendResponse(res, 400, 'validation error', { error: result });
    }
}


module.exports = { addComment, deleteComment, getComment }