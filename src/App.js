import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const initialState = JSON.parse(localStorage.getItem("list"));
  const [eventStart, setEventStart] = useState("")
  const [eventEnd, setEventEnd] = useState("")
  const [desc, setDesc] = useState("")
  const [event, setEvent] = useState("")

  const [list, setList] = useState((initialState) ? initialState : [])

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  function handleAdd() {
    if (eventStart === "" || desc === "" || event === "" || eventEnd === "") {
      alert("Fields cannot be left Empty !")
    }
    else {
      let start = new Date(eventStart)
      let end = new Date(eventEnd)
      let myTime = start.toLocaleString() + " - " + end.toLocaleString()

      let obj = {
        id: new Date().getTime(),
        event: event,
        desc: desc,
        timing: myTime
      }
      setList([...list, obj])
      setDesc("")
      setEventStart("")
      setEventEnd("")
      setEvent("")
    }
  }

  function handelDelete(id) {
    let myList = JSON.parse(JSON.stringify(list))
    myList = myList.filter((item) => {
      return item.id !== id
    })
    setList(myList)
  }

  let id = 1;

  return (
    <div className='outerDiv'>
      <div className='innerDiv'>
        <h1>Event Timeline</h1>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Event</th>
              <th>Description</th>
              <th>Timing</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list && list.map((item) => {
              return <tr key={item.id}>
                <td>{id++}</td>
                <td>{item.event}</td>
                <td className='description'>{item.desc}</td>
                <td>{item.timing}</td>
                <td className='redBtn'><button onClick={() => handelDelete(item.id)}>X</button></td>
              </tr>
            })}
            <tr>
              <td>{list.length + 1}</td>
              <td>
                <input type={'text'} placeholder="Enter Event Name" value={event} onChange={(e) => setEvent(e.target.value)}></input>
              </td>
              <td className='description'><textarea type={'text'} placeholder="Enter Event Description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea></td>
              <td>
                Start:<input type={'datetime-local'} placeholder="Enter Event Timing" value={eventStart} onChange={(e) => setEventStart(e.target.value)}></input>
                End:
                <br />
                <input type={'datetime-local'} placeholder="Enter Event Timing" value={eventEnd} onChange={(e) => setEventEnd(e.target.value)}></input>

              </td>
              <td className='btn'><button onClick={() => handleAdd()}>ADD ITEM</button>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
