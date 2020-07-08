var express = require('express');
var router = express.Router();
const axios = require('axios'); 
const db = require('../models');
//middleware
const flash = require('flash');
const passport = require("../config/ppConfig")