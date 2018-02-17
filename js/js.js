App = {
  account:'',
  contracts:{},
  abi:{},
  address:{
    event_test:"0xA73343d170Ac430775ca6B0F4364a0960b058E0a"
  },

  init:function(){
    console.log('this is only a test')

    return App.initWeb3();


  },
  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    web3.eth.getAccounts(function(e, r){
        console.log(r)
        $('#ethAccountID').html(r[0])
        App.account = r[0];
        web3.eth.getBalance(r[0].toString(),function(e, r){
          console.log(e)
          console.log(r.toNumber())
          $('#currentBalance').html(web3.fromWei(r.toNumber()))

        })
      })

    return App.initContract();
  },
  initContract:function(){
    $.getJSON('js/event_test.json', function(data) {
      console.log(data)
      App.abi.event_test = web3.eth.contract(data)
      App.contracts.event_test = App.abi.event_test.at("0xA73343d170Ac430775ca6B0F4364a0960b058E0a")

      return App.setUI();

    })

  },
  setUI:function(){
    var btn1 = document.getElementById('button_1')
    var btn2 = document.getElementById('button_2')
    btn1.addEventListener('click', function(){
      App.contracts.event_test.button_1_clicked({from:App.account},function(e, r){
        if(!e){
          console.log((r))
          console.log('result from clicking btn1')
        }else{
          console.log(e)
          console.log('error')
        }
      })
    })
    btn2.addEventListener('click', function(){
      App.contracts.event_test.button_1_clicked({from:App.account}, function(e, r){
        if(!e){
          console.log((r))
          console.log('result')
        console.log('result from clicking btn2')
        }else{
          console.log(e)
          console.log('error')
        }
      })
    })

    return App.set_watchers();
  },
  set_watchers:function(){

    var btn1_event = App.contracts.event_test.Button1({}, {fromBlock:'latest', toBlock:'latest'})
    btn1_event.watch(function(e, r){
      if(!e){
        console.log("Button 2 event")
        console.log(r)
      }else{
        console.log('err')
        console.log(e)
      }
    })
    var btn2_event = App.contracts.event_test.Button2({}, {fromBlock:'latest', toBlock:'latest'})
    btn2_event.watch(function(e, r){
      if(!e){
        console.log("Button 2 event")
        console.log(r)
      }else{
        console.log('err')
        console.log(e)
      }
    })

  },
  a2hex:function(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i ++) {
      var hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    return arr.join('');
  },

  hex2a:function(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; i < hex.length; i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
  },
}



$(function() {
  $(window).on('load', function() {
    App.init();
  });
});
