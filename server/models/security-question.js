/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SecurityQuestionSchema = new Schema({
    text: { type: String },
    isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions' })

module.exports = mongoose.model('SecurityQuestion', SecurityQuestionSchema);
