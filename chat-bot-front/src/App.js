import Chat from "./components/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className='d-flex justify-content-center p-4'>
                <Chat />
              </div>
            }
          />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
