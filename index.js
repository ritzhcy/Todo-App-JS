var arr_of_obj = new Set();
var value_id;
var card_item;
var title_flag = false;
var subtask = new Map;

function addpopuplist()
{
    document.getElementById("addinglistsection").style.display = "block";
};

function addcard()
{
    var card_title = document.getElementById("inputboxcard").value;
    createObj(card_title);
    closepopuplist();
}

function closepopuplist()
{
    document.getElementById("addinglistsection").style.display = "none";
}

function createObj(title){
    document.getElementById("empty-list").style.display = "none";
    var card_of_obj ={
        title: title,
        id: Date.now(),
        subtask
    };
    arr_of_obj.add(card_of_obj);
    createCard(card_of_obj.id);
}

function addlist()
{
    var List_of_item = document.querySelector(".this-list-element").cloneNode(true);
    var card_of_item = document.getElementById("inputtaskcard").value;
    console.log(value_id);
    List_of_item.innerText =  card_of_item ;
    List_of_item.style.display = "block";
    List_of_item.setAttribute('id',`${Date.now()}`);
    List_of_item.setAttribute('value',`${Date.now()}`);
    List_of_item.setAttribute('style',"margin-left: 10px;");
    var done_button = document.createElement('button');
    done_button.setAttribute('id',`check-done-${Date.now()}`);
    done_button.setAttribute('class','mark-as-done-class');
    done_button.setAttribute('value',`${Date.now()}`);
    done_button.setAttribute('onclick','completedTask(this.value)');
    done_button.innerText = ' mark as done';
    done_button.setAttribute('style','font-size:15 px;cursor:pointer; height:15px; border-radius:5px;');

    List_of_item.appendChild(done_button);

    List_of_item.setAttribute('onclick',"completedTask(this.value)");

    for(obj of arr_of_obj)
    {
        for(prop in obj)
        {
            if(obj.id == value_id)
            {
                obj.subtask.set(`${card_item}`,`${Date.now()}`);
                break;
            }
        }
    }

    document.getElementById(`${value_id}`).getElementsByClassName('add-list-after-this')[0].appendChild(List_of_item).appendChild(done_button);
    closepopupcard();
}

function closepopupcard()
{
    document.getElementById("addingitemsection").style.display = "none";
}

function addSubtask(val) 
{
    document.getElementById("addingitemsection").style.display = "block";
    value_id = val;
};

function deleteCard(val)
{
    var delete_div = document.getElementById(`${val}`);
    
    for(obj of arr_of_obj)
    {
        for(prop in obj)
        {
            if (obj.id==val)
                arr_of_obj.delete(obj);
            break;
        }
    }
    delete_div.parentNode.removeChild(delete_div);
    if(arr_of_obj.size==0)
    {
        document.getElementById("empty-list").style.display = 'block';
    }
};

function createCard()
{
    var first_card = document.querySelector('.card').cloneNode(true);
    display(first_card);
};


function completedTask(value)
{
    document.getElementById(`${value}`).style.textDecoration = 'line-through';
    document.getElementById(`${value}`).style.color = '#112D4E';
    document.getElementById(`check-done-${value}`).remove();
}


function display(card)
{
    document.getElementById('empty-list').style.display = "none";
    arr_of_obj.forEach(element => {
        card.id = element.id;
        card.querySelector(".card-head").innerHTML = element.title;
        card.querySelector(".card-head").setAttribute('value',`${element.id}`);
        card.setAttribute("value",`${element.id}`);
        card.setAttribute("display","block");
        card.setAttribute("min-height","300px");
        card.querySelector(".delete-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".delete-button-in-card").setAttribute("onclick","deleteCard(this.value)");
        card.querySelector(".add-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".add-button-in-card").setAttribute("onclick","addSubtask(this.value)");    
    });
    if(title_flag)
    card.style.display = "none";
    else
    card.style.display = "block";
    document.getElementById("outer_container").appendChild(card);
}

function headerfunc(val)
{
    var card_header;
    
    for(let ele of arr_of_obj)
    {
        for(let id in ele)
        {
            if(ele[id]==val)
            {
                card_header = ele.title;
                break;
            };
        };
    };

    document.querySelector("#heading").style.display = "none";
    document.querySelector("#button_text").style.display = "none";
    for(let ele of arr_of_obj)
    {
            if(ele.id==val)
            {
                document.getElementById(`${ele.id}`).style.display = 'block';
            }
            else 
            {
                document.getElementById(`${ele.id}`).style.display = 'none';
            }
    };

    document.getElementById('dynamic-card').innerText = `${card_header}`;
    document.getElementById("dynamic-card").style.display = "flex";
    document.getElementById("back_button").style.display = "block";
    document.getElementById("outer_container").style.justifyContent = "space-around";
    title_flag = true;
};

function displayall()
{
    title_flag = false;
    document.querySelector("#heading").style.display = "block";
    document.querySelector("#button_text").style.display = "inline-block";
    document.getElementById("back_button").style.display = "none";
    for(let ele of arr_of_obj)
    {
        document.getElementById(`${ele.id}`).style.display = "block";
    };
    document.getElementById("dynamic-card").innerText = ``;
    document.getElementById("dynamic-card").style.display = "none";
}
