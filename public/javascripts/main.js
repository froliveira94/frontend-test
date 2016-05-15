// your code

var Ranking = Backbone.Model.extend({});

var _RankingCollection = Backbone.Collection.extend({
  model: Ranking,
  url: 'fazenda.json',
  parse : function(response){
    return response.data;
  }
});

var testCollection = new _RankingCollection();

testCollection.fetch({
  success: function() {
    console.log(testCollection);
  }
});

_RankingListView = Backbone.View.extend({

  collection: new _RankingCollection(),

  initialize: function(){
    var scope = this;
    this.collection.fetch({
      success: function() {
        scope.render();
      }
    });
  },

  render: function(){
      var template = $("#teste");
      var el = $(this.el);
      this.collection.each(function(model){
          var html = template.tmpl(model.toJSON());
          el.append(html);
      });
      $("#showIt").html(el);
    }
});

var RankingListView = new _RankingListView();
