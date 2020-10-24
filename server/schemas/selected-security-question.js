/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashliegh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let selectedSecurityQuestionSchema  = new Schema({
  questionText: { type: String },
  answerText: { type: String }
})

module.exports = selectedSecurityQuestionSchema;
