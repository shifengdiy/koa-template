module.exports = {
  "button": [
    {
      "name": "故障上报",
      "sub_button": [
        {
          "type": "scancode_push",
          "name": "扫一扫",
          "key": "rselfmenu_0_1"
        },
        {
          "type": "view",
          "name": "手动上报",
          "url": "report_url"
        },
        {
          "type": "view",
          "name": "报修记录",
          "url": "reportList_url"

        }
      ]
    },
    {
      "name": "市民交流",
      "sub_button": [
        {
          "type": "view",
          "name": "意见反馈",
          "url": "suggest_react_url"
        },
        {
          "type": "view",
          "name": "新闻速递",
          "url": "http://zhzm.xtdsglc.com/reportHistory"
        }
      ]
    },
  ]
}