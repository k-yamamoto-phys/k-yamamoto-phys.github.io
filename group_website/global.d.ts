// global.d.ts
declare module "*.yml" {
    const value: any;
    export default value;
}

declare module "*.yaml" {
    const value: any;
    export default value;
}

declare module "*.md" {
    const value: any;
    export default value;
}