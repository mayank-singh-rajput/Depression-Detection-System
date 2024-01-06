const QuestionCard = ({ question, setSelected }) => {
    let selected = question.selected;
  
    return (
      <div className="box-border pt-20 pb-5 mt-20 ml-30 border-4 border-gray-500 rounded-full container mx-auto" key={question.Question}>
        <h1 className="text-3xl font-bold"> {question.Question} </h1>
  
        <div className="font-medium flex items-center justify-center w-[box-border]">
        <ul className="grid grid-cols-2 divide-x gap-x-10 gap-y-4 p-5 m-5">
            <label> <li className={`p-2 border-separate border-spacing-2 border border-slate-500 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-500 ${selected == 1 ? 'bg-lime-500' : 'bg-white'}`} key={question.First} > 
            <input name="input_5" type="radio" value={1} onChange={(e) => setSelected(e.target.value)} checked={selected == 1}/>
                 {question.First}
            </li> </label>
  
            <label> <li className={`p-2 border-separate border-spacing-2 border border-slate-500 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-500 ${selected == 2 ? 'bg-lime-500' : 'bg-white'}`} key={question.Second} > 
            <input name="input_5" type="radio" value={2} onChange={(e) => setSelected(e.target.value)} checked={selected == 2}/> 
                 {question.Second} 
            </li> </label>
  
            <label> <li className={`p-2 border-separate border-spacing-2 border border-slate-500 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-500 ${selected == 3 ? 'bg-lime-500' : 'bg-white'}`} key={question.Third} > 
            <input name="input_5" type="radio" value={3} onChange={(e) => setSelected(e.target.value)} checked={selected == 3}/> 
                 {question.Third} 
            </li> </label>
  
            <label> <li className={`p-2 border-separate border-spacing-2 border border-slate-500 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-500 ${selected == 4 ? 'bg-lime-500' : 'bg-white'}`} key={question.Forth} >
            <input name="input_5" type="radio" value={4} onChange={(e) => setSelected(e.target.value)} checked={selected == 4}/>
                 {question.Forth}
            </li>  </label>
        </ul>
        </div>
  
      </div>
    );
}

export default QuestionCard;