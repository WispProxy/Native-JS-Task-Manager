'use strict';

/********************************************
 *  Init Global variables
 ********************************************/
var container   = document.getElementById('listContainer'),
	lists       = [],
	cards       = [];
/**
 *
 ********************************************/



/********************************************
 *  Create Functions for Task Manager
 ********************************************/
/**
 *  Functions for List Block
 */
function addList ()
{
	var title;

	title   = document.getElementById('title').value;

	document.getElementById('title').value = '';

	if (title !== '')
	{
		createListDisplay(title);

		saveLists();
	}

	return false;
}

function saveLists ()
{
	var t;

	t   = [];

	if (localStorage && lists[ 0 ] !== undefined)
	{
		t   = [];

		for (var i in lists)
		{
			var p;

			p   = lists[ i ];

			t.push({
				t:  p.t,
				id: p.id
			});
		}

		localStorage[ 'lists' ] = JSON.stringify(t);
	}
}

function loadLists ()
{
	if (localStorage)
	{
		if (localStorage[ 'lists' ] !== undefined)
		{
			var t;

			t   = JSON.parse(localStorage[ 'lists' ]);

			for (var i in t)
			{
				var p;

				p   = t[ i ];

				createListDisplay(p.t);
			}
		}
	}
}

function deleteList (_id)
{
	container.removeChild(lists[ _id ].d);

	lists[ _id ]    = lists[ lists.length - 1 ];

	lists.pop();

	for (var i in lists)
	{
		lists[ i ].id = i;
		lists[ i ].a.id = i;
	}

	saveLists();
}

function createListDisplay (_title)
{
	var d,
		id,
		p,
		a,
		h,
		t,
		c,
		cont;

	d       = document.createElement('div');
	d.id    = 'list-' + lists.length;
	id      = lists.length;

	lists.push({
		d:  d,
		t:  _title,
		id: id
	});

	p       = lists[ lists.length - 1 ];

	d.className = 'span3 well list';

	a       = document.createElement('a');

	a.id    = id;

	a.className = 'close';
	a.innerHTML = 'x';

	a.onclick = function ()
	{

		deleteList(this.id)
	};

	d.appendChild(a);

	p.a     = a;

	h       = document.createElement('h2');

	h.className = 'list_head';
	h.innerHTML = _title;
	d.appendChild(h);
	p.h     = h;

	t       = document.createElement('div');
	t.className = 'card_box';

	c       = document.createElement('div');
	c.setAttribute('id', 'cards-' + id);
	t.appendChild(c);

	cont    = document.createElement('div');
	cont.innerHTML = '<form onsubmit="return addCard(' + id + ')"><textarea class="span3" rows="3" cols="200" name="' + id + '_card_content" id="' + id + '_card_content" placeholder="Please input your task description" ></textarea><input type="hidden" id="card_no" name="card_no" value="' + id + '"><button type="submit" class="btn btn-info">Add New Task</button></form>';
	t.appendChild(cont);
	d.appendChild(t);

	container.appendChild(d);
}

/**
 *  Functions for Card Block
 */
function addCard (_number)
{
	var c;

	c       = document.getElementById(_number + '_card_content').value;

	document.getElementById(_number + '_card_content').value = '';

	if (c !== '')
	{
		createCardDisplay(c, _number);
	}

	return false;
}

function createCardDisplay (_content, _number)
{
	var d,
		l,
		id,
		p,
		a,
		h;

	d       = document.createElement('div');
	l       = document.getElementById('cards-' + _number);

	d.id    = 'card-' + cards.length;
	d.className = 'card_item';

	id      = cards.length;

	cards.push({
		d:  d,
		c:  _content,
		id: id
	});

	p       = cards[ cards.length - 1 ];

	a       = document.createElement('a');

	a.id    = id;
	a.className = 'close';
	a.innerHTML = 'x';

	a.onclick = function ()
	{

		deleteCard(this.id, _number)
	};

	d.appendChild(a);
	p.a     = a;

	h       = document.createElement('p');

	h.innerHTML = _content;
	h.setAttribute('contenteditable', true);
	d.appendChild(h);
	p.h     = h;
	l.appendChild(d);
}

function deleteCard (_id, _number)
{
	var l;

	l       = document.getElementById('cards-' + _number);

	l.removeChild(cards[ _id ].d);

	cards[ _id ] = cards[ cards.length - 1 ];
	cards.pop();

	for (var i in cards)
	{
		cards[ i ].id = i;
		cards[ i ].a.id = i;
	}
}
/**
 *
 ********************************************/



/********************************************
 *  Create Helper Functions for Task Manager
 ********************************************/
/**
 *  Toggle DIVs!
 */
function toggleDiv (_value)
{
	if (_value === 1)
	{
		document.getElementById('new_list').style.display           = 'block';
		document.getElementById('new_list_button').style.display    = 'none';
	}
	else
	{
		document.getElementById('new_list_button').style.display    = 'block';
		document.getElementById('new_list').style.display           = 'none';
	}
}

function toggleDivs (_showDiv, _hideDiv)
{
	document.getElementById(_showDiv).style.display     = 'block';
	document.getElementById(_hideDiv).style.display     = 'none';
}
/**
 *
 ********************************************/




/********************************************
 *  Load Lists for Task Manager
 ********************************************/
	loadLists();
/**
 *
 ********************************************/
