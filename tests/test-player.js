//Runs Chai and puppeteer

const puppeteer = require('puppeteer');
const core=require('@actions/core');
const { error } = require('console');
const { start } = require('repl');

const { assert } = require('chai').assert;
const { should } = require('chai').should;
const { expect } = require('chai').expect;


async function testPlayerConstructor() {
    let p = new Player();

    //Grab the player and ensure it is a sprite object
    expect(p).to.be.a('Sprite');

    expect(player.collider()).to.equal('dynamic');







}