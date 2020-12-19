declare module 'element-ui/*';
declare module '@cloudbase/vue-provider';

declare module "*.json" {
  const value: any;
  export default value;
}