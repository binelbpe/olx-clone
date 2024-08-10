import React from 'react';
import { Bars} from 'react-loader-spinner';
import './Spinner.css';

function Spinner() {
    return (
        <div className="spinner-container">
            <Bars
                color="#007bff" 
                height={200} 
                width={200} 
            />
        </div>
    );
}

export default Spinner;
