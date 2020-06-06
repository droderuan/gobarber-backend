interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTempateDTO {
  file: string;
  variables: ITemplateVariables;
}
