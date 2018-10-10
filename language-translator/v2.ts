/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import isStream = require('isstream');
import { getMissingParams } from '../lib/helper';
import GeneratedLanguageTranslatorV2 = require('./v2-generated');

class LanguageTranslatorV2 extends GeneratedLanguageTranslatorV2 {
  constructor(options) {
    super(options);
    if (!options['silent']) {
      // eslint-disable-next-line no-console
      console.warn(
        'WARNING: Language Translator V2 is deprecated and will be removed in the next major release of the SDK. Use Language Translator V3.' +
          ' Set {silent: true} to disable this message.'
      );
    }
  }

  getModels(params, callback) {
    console.warn("WARNING: getModels() was renamed to listModels(). Support for getModels() will be removed in the next major release");
    return super.listModels(params, callback);
  }

  getModel(params, callback) {
    return super.getModel(params, callback);
  }

  createModel(params, callback) {
    if (params) {
      const inputTypes: string[] = [
        'forced_glossary',
        'parallel_corpus',
        'monolingual_corpus'
      ];
      inputTypes.forEach(type => {
        if (params[type] && !isStream(params[type])) {
          return callback(
            new Error(`${type} is not a standard Node.js Stream`)
          );
        }
      });
    }
    return super.createModel(params, callback);
  }

  translate(params, callback) {
    if (!params || !(params.model_id || (params.source && params.target))) {
      return callback(
        new Error('Missing required parameters: model_id or source and target')
      );
    }
    return super.translate(params, callback);
  }

  getIdentifiableLanguages(params, callback) {
    console.warn("WARNING: getIdentifiableLanguages() was renamed to listIdentifiableLanguages(). Support for getIdentifiableLanguages() will be removed in the next major release");
    return super.listIdentifiableLanguages(params, callback);
  }
}

export = LanguageTranslatorV2;
