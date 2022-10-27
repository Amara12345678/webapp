//дэлгэцтэй ажиллах controller
var uiController = (function () {})();

//санхүүтай ажиллах controller
var financeController = (function () {
  //1. oruulah ugugdliig delgetsees olj awna
  //2.olj awsan ugugluudiig sanhuugiin controllert damjuulj hadgalna
  //3.olj awsan ogogdluude web deere tohiroh hesegt n gargana
  //4.tuswiig tootsoolno
  //5.etssiin vldegdel tootsoog delgetsend gargana
})();

//програмын холбогч controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {};
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.key === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
