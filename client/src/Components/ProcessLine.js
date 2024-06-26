import React, { useState } from 'react';
import '../Assets/Styles/ProcessLine.css';
import PinLibraryOfTools from './PinLibraryOfTools';
import Sidebar from './ButtonMeny.js';


const ProcessLine = () => {
  const [circles, setCircles] = useState([]);
  const [showPinLibrary, setShowPinLibrary] = useState(false);

  const handleAddCircle = () => {
    if (circles.length < 30) { // Updated to handle up to 30 circles
      setShowPinLibrary(true);
    }
  };

  const closePinLibrary = () => {
    setShowPinLibrary(false);
  };

  const handleSelectTool = (ToolComponent) => {
    setCircles([...circles, { id: circles.length + 1, tool: <ToolComponent /> }]);
    setShowPinLibrary(false);
  };

  return (
    <div>
      <Sidebar />
      <div className="process-line-container">
        <div className="process-line-header">
          <div className="process-line-text-wrapper">
            <span className="process-line-text">START</span>
          </div>
          <div className="process-line-text-wrapper">
            <span className="process-line-text">END</span>
          </div>
        </div>
        <div className="process-line-wrapper">
          <div className="process-line">
            {circles.slice(0, 10).map((circle, index) => (
              <div key={index} className="process-circle">
                {circle.tool ? (
                  circle.tool
                ) : (
                  <div className="process-circle-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                      <circle cx="22.5" cy="22.5" r="21.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {circles.length < 10 && (
              <div className="process-line-add-wrapper" onClick={handleAddCircle}>
                <div className="process-line-add">
                  <span className="add-icon">+</span>
                </div>
                <div className="add-text-wrapper">
                  <span className="add-text">ADD NEW</span>
                </div>
              </div>
            )}
          </div>
          {circles.length >= 10 && (
            <>
              <div className="curved-section"></div>
              <div className="straight-section"></div>
              <div className="second-curved-section"></div>
              <div className="second-straight-section">
                {circles.slice(10, 20).map((circle, index) => (
                  <div key={index} className="process-circle">
                    {circle.tool ? (
                      circle.tool
                    ) : (
                      <div className="process-circle-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                          <circle cx="22.5" cy="22.5" r="21.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
                {circles.length < 20 && (
                  <div className="process-line-add-wrapper second-add-wrapper" onClick={handleAddCircle}>
                    <div className="process-line-add">
                      <span className="add-icon">+</span>
                    </div>
                    <div className="add-text-wrapper">
                      <span className="add-text">ADD NEW</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {circles.length >= 20 && (
            <>
              <div className="third-curved-section"></div>
              <div className="third-straight-section"></div>
              <div className="fourth-curved-section"></div>
              <div className="fourth-straight-section">
                {circles.slice(20, 30).map((circle, index) => (
                  <div key={index} className="process-circle">
                    {circle.tool ? (
                      circle.tool
                    ) : (
                      <div className="process-circle-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                          <circle cx="22.5" cy="22.5" r="21.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
                {circles.length < 30 && (
                  <div className="process-line-add-wrapper third-add-wrapper" onClick={handleAddCircle}>
                    <div className="process-line-add">
                      <span className="add-icon">+</span>
                    </div>
                    <div className="add-text-wrapper">
                      <span className="add-text">ADD NEW</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="circle-container">
          <div className="addCircle purple-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
              <circle cx="22.5" cy="22.5" r="21.5" />
            </svg>
            <span className="circle-text">ACTIVITY DONE</span>
          </div>
          <div className="addCircle red-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
              <circle cx="22.5" cy="22.5" r="21.5" />
            </svg>
            <span className="circle-text">RESEARCH</span>
          </div>
          <div className="addCircle yellow-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
              <circle cx="22.5" cy="22.5" r="21.5" />
            </svg>
            <span className="circle-text">IDEATION</span>
          </div>
          <div className="addCircle blue-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
              <circle cx="22.5" cy="22.5" r="21.5" />
            </svg>
            <span className="circle-text">EVALUATION</span>
          </div>
        </div>
        <div className="bottom-bar"></div>

        {showPinLibrary && (
          <div className="overlay">
            <PinLibraryOfTools onClose={closePinLibrary} onSelectTool={handleSelectTool} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessLine;
