// your code

//Create model
var Ranking = Backbone.Model.extend({});

//Create Collection
var _RankingCollection = Backbone.Collection.extend({
  model: Ranking,
  url: 'fazenda.json',
  parse : function(response){
    return response.data;
  }
});

//Test Collection
var testCollection = new _RankingCollection();

testCollection.fetch({
  success: function() {
    console.log(testCollection);
  }
});

//Create view
_RankingListView = Backbone.View.extend({

  el: $('#list'),

  collection: new _RankingCollection(),

  initialize: function(){
    var scope = this;
    this.collection.fetch({
      success: function() {
        scope.render();
      }
    });
  },

  calculePorcent: function(positive, negative) {
    var like;
    var dislike;
    var percentegeLike;
    var percentegeDislike;
    var obj;


      if(positive === null || typeof positive == "undefined")
      {
        positive = 1;
      }

      if(negative === null || typeof negative == "undefined") {
        negative = 1;
      }


      var totalVotes = parseInt(positive) + parseInt(negative);
      like = (parseInt(positive) / totalVotes) * 100;
      dislike = (parseInt(negative) / totalVotes) * 100;

      percentegeLike =  Math.round(like);
      percentegeDislike = Math.round(dislike);

    obj = {
      like: percentegeLike,
      dislike: percentegeDislike
    }

    return obj;

  },

  render: function(){
      var scope = this;
      var template = $("#teste");
      var el = $(this.el);
      var object;
      var objPercent;
      var count = 0;
      this.collection.each(function(model){
          count++;
          object = model.toJSON();
          objPercent = scope.calculePorcent(object.positive, object.negative);
          object["like"] = objPercent.like;
          object["dislike"] = objPercent.dislike;
          object["number"] = count;
          console.log(object);
          var html = template.tmpl(object);
          el.append(html);
      });
      $(".list-person").html(el);
      showTooltip($('.list-person-item'));
    }

});

//Show tooltip and add class active
var showTooltip = function(selector){
  console.log(selector.next('.tooltip'));
  selector.hover(function(){
    $(this).addClass('active');
    $(this).next('.tooltip').css('display', 'block');
  });
  selector.mouseleave(function(){
    $(this).removeClass('active');
    $(this).next('.tooltip').css('display', 'none');
  });
};


var RankingListView = new _RankingListView();
