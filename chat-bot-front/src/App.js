import Chat from "./components/chat";
import ShowMovies from "./components/movie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./components/context";


function App() {
  return (
    <div>
      <ContextProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <ShowMovies />
                  <div className='d-flex justify-content-center p-4'>
                    <Chat />
                  </div>
                </div>
              }
            />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
