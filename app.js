//дэлгэцтэй ажиллах controller
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },

    addListItem: function (item, type) {
      //orlogo zarlagiin elementiig aguulsan html iig beltegne
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //html dotroo orlogozgrlagiin utguudiig replace ashiglaj uurchilj ugno
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);

      //beltgesen html ee dom ruu hiij ugnu
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

//санхүүтай ажиллах controller
var financeController = (function () {
  //private data
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //private data
  var Expence = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //private data
  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, desc, val) {
      var item, id;
      //
      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expence(id, desc, val);
      }

      data.items[type].push(item);

      return item;
    },

    seeData: function () {
      return data;
    },
  };
})();

//програмын холбогч controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. oruulah ugugdliig delgetsees olj awna
    var input = uiController.getInput();

    //2.olj awsan ugugluudiig sanhuugiin controllert damjuulj hadgalna
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );
    //3.olj awsan ogogdluude web deere tohiroh hesegt n gargana
    uiController.addListItem(item, input.type);

    //4.tuswiig tootsoolno
    //5.etssiin vldegdel tootsoog delgetsend gargana
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("App started ...");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
