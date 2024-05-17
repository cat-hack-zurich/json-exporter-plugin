import {YourGlobalConfig} from './types';
import {PluginInterface, PluginParams} from '../types/interface';
import * as path from 'path';
import * as fs from 'fs/promises';

export const JSONExporter = (
  globalConfig: YourGlobalConfig
): PluginInterface => {
  const metadata = {
    kind: 'execute',
  };

  const createJSONContent = (
    inputs: PluginParams[],
  ): string => {
    return JSON.stringify(inputs);
  }

  /**
   * Execute's strategy description here.
   */
  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {
    
    const {"output-path": outputPath} = globalConfig;
    const dirPath = path.dirname(outputPath);

    try {
      await fs.mkdir(dirPath, {recursive: true});
    } catch (error) {
      throw error;
    }

    const contents = createJSONContent(inputs);
    
    try {
      await fs.writeFile(outputPath, contents);
    } catch (error) {
      throw error;
    };

    return inputs;
  };

  return {
    metadata,
    execute,
  };
};
