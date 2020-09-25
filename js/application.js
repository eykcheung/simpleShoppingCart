var sum = function (acc, x) { return acc + x; };

var updateShoppingTotal = function () {
  var itemsSubTotal = [];

  $('.itemRow').each(function (i, ele) {
    var subTotal = updateSubTotal(ele);
    itemsSubTotal.push(subTotal);
  });

  var shoppingTotal = itemsSubTotal.reduce(sum);
  $('.totalPriceCost').html(shoppingTotal);
}


var updateSubTotal = function (ele) {
  var itemCost = parseFloat($(ele).children('.itemPrice').children('.itemCost').text());
  var itemQuantity = parseFloat($(ele).find('.itemQty .qtyAmt input').val());

  //item sub-total
  var subTotal = itemCost * itemQuantity;
  $(ele).children('.itemSubAmt').html(subTotal);

  return subTotal;
}


$(document).ready(function () {
  updateShoppingTotal();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('.itemRow').remove();
    updateShoppingTotal();
  });

  var timeout;
  $(document).on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateShoppingTotal();
    }, 1000);
  });

  $('.addItemRowForm').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).find('.addItemNameInput').val();
    var price = $(this).find('.addItemCostInput').val();

    $('.container').prepend('<div class = "row itemRow"> ' +
      '<div class = "col-xs-3 itemName">' + name + '</div> ' +
      '<div class = "col-xs-3 itemPrice"> ' +
        '<div class = "itemCcy">$</div> '  +
        '<div class = "itemCost"> ' + price + '</div> ' +
      '</div> ' +
      '<div class = "col-xs-3 itemQty"> ' +
        '<div class = "qtyLabel">QTY</div> '  +
        '<div class = "qtyAmt"><input type="number" value="1" /></div> ' +
      '</div> ' +
      '<div class = "col-xs-1"> ' +
        '<button class="btn btn-light btn-sm remove">Remove</button> ' +
      '</div> ' +
      '<div class = "col-xs-2"> ' +
        '<div class = "itemSubTotal"> ' +
          '<div class = "itemSubCcy">$</div> ' +
          '<div class = "itemSubAmt">--.--</div> ' +
        '</div> ' +
      '</div> ' +
    '</div> ');

    updateShoppingTotal();
    $(this).find('.addItemNameInput').val('');
    $(this).find('.addItemCostInput').val('');
  });

});
