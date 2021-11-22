import { IApi } from 'umi';
import { join } from 'path';

export default (api: IApi) => {
  api.addRuntimePlugin(() => join(__dirname, 'RecoilRoot'));

  api.addUmiExports(() => ({
    source: join(__dirname, 'useRecoilObjState'),
    specifiers: ['useRecoilObjState'],
  }))
};
