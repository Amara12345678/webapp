//дэлгэцтэй ажиллах controller
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomelist: ".income__list",
    expenselist: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenceLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function (too, type) {
    too = "" + too;
    var x = too.split("").reverse().join("");

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }
    var z = y.split("").reverse().join("");
    if (z[0] === ",") z = z.substr(1, z.length - 1);

    if (type === "inc") z = "+ " + z;
    else z = " -" + z;

    return z;
  };

  return {
    displayDate: function () {
      var unuudur = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getFullYear() + " оны " + unuudur.getMonth() + " сарын";
    },
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    displayPercentage: function (allPersentages) {
      //zarlagiin node listiig oloh
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );

      //element bolgonii huwid zarlagiin huwiig massive aas awch shiwj oruulah
      nodeListForeach(elements, function (el, index) {
        el.textContent = allPersentages[index];
      });
    },
    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      //convert list to Arrey
      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (el, index, arrey) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    tusviigUzuuleh: function (tusuv) {
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenceLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );

      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi;
      }
    },

    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function (item, type) {
      //orlogo zarlagiin elementiig aguulsan html iig beltegne
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomelist;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
      } else {
        list = DOMstrings.expenselist;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //html dotroo orlogozgrlagiin utguudiig replace ashiglaj uurchilj ugno
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", formatMoney(item.value, type));

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
    this.percentage = -1;
  };

  Expence.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };

  Expence.prototype.getPercentage = function () {
    return this.percentage;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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

    tusuv: 0,

    huvi: 0,
  };

  return {
    tusuvTootsooloh: function () {
      //niit orlogo iig, niilberiig tootsoolno
      calculateTotal("inc");

      //niit arlagiin niilberiig tootsoolno
      calculateTotal("exp");
      //tusuwiig shineer tootsooolno

      data.tusuv = data.totals.inc - data.totals.exp;

      //orlogo zarlaga iin huwiig tootsoolno
      if (data.totals.inc > 0) {
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.huvi = 0;
      }
    },

    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPersentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });

      return allPersentages;
    },

    tusviigAwah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },

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

    if (input.description !== "" && input.value !== "") {
      //2.olj awsan ugugluudiig sanhuugiin controllert damjuulj hadgalna
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      //3.olj awsan ogogdluude web deere tohiroh hesegt n gargana
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      // tusviig shiner tootsoolj delgetsend uzuulne
      updateTusuv();
    }
  };

  var updateTusuv = function () {
    //4.tuswiig tootsoolno
    financeController.tusuvTootsooloh();

    //5.etssiin vldegdel tootsoog delgetsend gargana
    var tusuv = financeController.tusviigAwah();

    //6.tuswiig delgetsend gargana
    uiController.tusviigUzuuleh(tusuv);

    //  7. elementuudin huviig tootsoolon
    financeController.calculatePercentages();
    //  8.elementuudiin huwiig huleej awna
    var allPersentages = financeController.getPercentages();

    //9.  edgeer huwiig delgetsend gargana
    uiController.displayPercentage(allPersentages);
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

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          console.log(type + " ===> " + itemId);

          //1. sanhuugiin modulaas type id ashiglaad ustagna
          financeController.deleteItem(type, itemId);
          //2. delgets deerees ene elementiig ustgana
          uiController.deleteListItem(id);
          //3. uldegdel tootsoog shinchilj haruulna
          updateTusuv();
        }
      });
  };

  return {
    init: function () {
      console.log("App started ...");
      uiController.displayDate();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
