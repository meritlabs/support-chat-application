export function formConfig(app: any, params: any) {
  app.get('/application', function(req: any, res: any) {
    res.jsonp({ wallet_app: params.wallet, mws: params.mws });
  });
}
