import React, { useState, useEffect, useRef } from "react";

export default function FoulInputModal({ player, onSubmit, onCancel, t }) {
    const inputRef = useRef(null);
    const valueRef = useRef("");
    const [value, setValue] = useState("");

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const submit = () => {
        const intValue = parseInt(valueRef.current, 10);
        if (!isNaN(intValue) && intValue >= 1 && intValue <= 9) {
            onSubmit(intValue);
        }
    };

    const handleClick = (digit) => {
        if (value.length < 2) {
            setValue((prev) => prev + digit);
        }
    };

    const handleDelete = () => {
        setValue((prev) => prev.slice(0, -1));
    };

    useEffect(() => {
        inputRef.current?.focus();

        const handleKey = (e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") onCancel();
            if (/^[1-9]$/.test(e.key)) handleClick(e.key);
            if (e.key === "Backspace") handleDelete();
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h3>{t.foulPromptTitle} {player}</h3>
                <input
                    type="text"
                    value={value}
                    readOnly
                    ref={inputRef}
                />

                <div className="numpad-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <button key={n} onClick={() => handleClick(n)}>{n}</button>
                    ))}
                    <button onClick={handleDelete}>←</button>
                </div>

                <div className="modal-actions">
                    <button onClick={submit}>{t.foulPromptConfirm}</button>
                    <button onClick={onCancel}>{t.foulPromptCancel}</button>
                </div>
            </div>
        </div>
    );
}
