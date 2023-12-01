import * as cheerio from 'cheerio';
import {Site} from '../models';

const fetch = require('node-fetch');

export async function processSite(site: Site) {
  if (!site.url) {
    throw new Error('No hay url definida')
  }
  if (!site.document_extractor) {
    throw new Error('No hay extractor definido')
  }

  //ejemplo extraccion cheerio:
  //(cheerio)=>{
  //  return {
  // title: cheerio('title').text(),
  // encabezado: cheerio('h1').text()
  // }

  const response = await fetch(site.url);
  const document = await response.text();
  const instanciaCheerio = cheerio.load(document);

  const fn = eval(site.document_extractor)

  return fn(instanciaCheerio)
}
