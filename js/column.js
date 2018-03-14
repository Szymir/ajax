function Column(id, name) {
    this.id = id;
    this.name = name || 'No name given';
	this.element = createColumn(this);

	function createColumn(context) {
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		var columnId = context.id;

		columnDelete.on("click", function() {
			context.deleteColumn();
		});
		console.log(columnId);
		columnAddCard.on("click", function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			console.log(columnId);
			$.ajax({
			    url: baseUrl + '/card',
			    method: 'POST',
			    data: {
			    name: cardName,
			    bootcamp_kanban_column_id: columnId
			    },
			    success: function(response) {
			        var card = new Card(response.id, cardName);
			        context.createCard(card);
			    }
			});
		});
			
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
	    var self = this;
	    $.ajax({
	      url: baseUrl + '/column/' + self.id,
	      method: 'DELETE',
	      success: function(response){
	        self.element.remove();
	      }
	    });
	 }
};