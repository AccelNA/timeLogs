'use strict'

var copyUtils = require('copy-utils')
var copy      = copyUtils.copy
var copyList  = copyUtils.copyList

var CONFIG = require('../config')
var KEYS   = Object.keys(CONFIG)

/**
 * Returns an object that copies from given source object
 * on the resulting object only the properties also found in cfg.
 *
 * If no cfg specified, CONFIG is assumed
 *
 * @param  {object} source
 * @param  {Object} [cfg] If not specied, CONFIG will be used
 *
 * @return {Object}
 */
module.exports = function asConfig(source, cfg){

    var keys = KEYS

    if (cfg){
        keys = Object.keys(cfg)
    }

    cfg = cfg || CONFIG

    if (!source){
        return copy(cfg)
    }

    return copyList(source, copy(cfg), keys)
}
