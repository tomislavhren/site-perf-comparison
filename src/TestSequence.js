import React from 'react'
import { testSequenceLabels, testSequenceStatus } from './constants';
import './testSequence.css';

const testSequenceEntries = Object.entries(testSequenceLabels);

const TestSequence = ({ testSequenceProgress }) => {

    const renderIcon = React.useCallback((key) => {
        const status = testSequenceProgress[key];
        switch (status) {
            case testSequenceStatus.IN_PROGRESS:
                return <span className="material-icons text-default">autorenew</span>            
            case testSequenceStatus.DONE:
                return <span className="material-icons text-success">check</span>            
            case testSequenceStatus.PENDING:
            default:
                return <span className="material-icons">remove</span>            
        }
    }, [testSequenceProgress]);

    return (
        <div className="test-sequence">
            <div className="test-sequence__title">Test Sequence:</div>
            <ul className="test-sequence__list">
                {testSequenceEntries.map(([key, text]) => 
                    <li className="test-sequence__entry" key={key}>
                        {renderIcon(key)} 
                        {text}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default TestSequence;