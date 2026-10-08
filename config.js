// 造型日報アプリの設定
// syncUrl: Apps Script を「ウェブアプリ」としてデプロイしたときの URL (…/exec)
// token  : Code.gs の TOKEN と同じ合言葉
// defaultCond: 品番マスターに値がないときに使う製造条件の標準値
window.SUNA_CONFIG = {
  syncUrl: "",
  adminPin: "0726",   // 品番マスターをExcelから更新するときのパスワード
  token: "3eAv6FdoiaIlRAW6",
  defaultCond: { sqt: "1.2", fup: "0.3", fut: "1.3" }
};
