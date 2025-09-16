// src/components/UzbekPhoneField.jsx
import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { digitsOnly, formatUzPhone, UZ_PREFIX, isUzPhoneComplete } from "../../utils/phoneFormat";

export default function UzbekPhoneField({
    label,
    valueDigits,
    onDigitsChange,
    error,
    helperText = " ",
    inputRef,
    onEnter,
}) {
    const [display, setDisplay] = useState(
        valueDigits ? formatUzPhone(valueDigits) : ""
    );
    const prevLenRef = useRef(digitsOnly(valueDigits).length);

    const ensureCaretAfterPrefix = (el) => {
        const pos = Math.max(el.selectionStart ?? 0, UZ_PREFIX.length);
        requestAnimationFrame(() => el.setSelectionRange(pos, pos));
    };

    const handleFocus = (e) => {
        const el = e.target;
        if (!display) {
            const v = formatUzPhone("");
            setDisplay(v);
            requestAnimationFrame(() => el.setSelectionRange(v.length, v.length));
        } else {
            ensureCaretAfterPrefix(el);
        }
    };

    const handleKeyDown = (e) => {

        const el = e.currentTarget;
        const start = el.selectionStart ?? 0;

        if ((e.key === "ArrowLeft" || e.key === "Home") && start <= UZ_PREFIX.length) {
            e.preventDefault();
            ensureCaretAfterPrefix(el);
        }
        if (
            (e.key === "Backspace" && start <= UZ_PREFIX.length) ||
            (e.key === "Delete" && start < UZ_PREFIX.length)
        ) {
            e.preventDefault();
        }
        if (e.key === "Enter") onEnter && onEnter();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = digitsOnly(e.clipboardData.getData("text"));
        let current = digitsOnly(display);
        if (current.startsWith("998")) current = current.slice(3);
        const nextDigits = (current + pasted).slice(0, 9);
        onDigitsChange(nextDigits);
        setDisplay(formatUzPhone(nextDigits));
    };

    const handleChange = (e) => {
        const el = e.target;
        let raw = digitsOnly(el.value);
        if (raw.startsWith('998')) raw = raw.slice(3);
        const trimmed = raw.slice(0, 9);

        const prevLen = prevLenRef.current;
        const nextLen = trimmed.length;

        onDigitsChange(trimmed);
        const nextDisplay = formatUzPhone(trimmed);
        setDisplay(nextDisplay);

        let targetPos = null;
        if (prevLen === 1 && nextLen === 2) {

            targetPos = caretAfterToken(nextDisplay, ") ", 1);
        } else if (prevLen === 4 && nextLen === 5) {

            targetPos = caretAfterToken(nextDisplay, "-", 1);
        } else if (prevLen === 6 && nextLen === 7) {

            targetPos = caretAfterToken(nextDisplay, "-", 2);
        }

        if (targetPos != null) {
            requestAnimationFrame(() => el.setSelectionRange(targetPos, targetPos));
        } else {
            const min = UZ_PREFIX.length;
            const pos = Math.max(el.selectionStart ?? min, min);
            requestAnimationFrame(() => el.setSelectionRange(pos, pos));
        }

        prevLenRef.current = nextLen;
    };


    return (
        <TextField
            label={label}
            fullWidth
            value={display}
            error={!!error}
            helperText={helperText}
            inputRef={inputRef}
            slotProps={{
                input: {
                    onFocus: handleFocus,
                    onKeyDown: handleKeyDown,
                    onPaste: handlePaste,
                    onChange: handleChange,
                    inputMode: "numeric",
                    autoComplete: "tel",
                },
            }}
        />
    );
}

function caretAfterToken(str, token, occurrence = 1) {
    let from = 0, idx = -1;
    for (let i = 0; i < occurrence; i++) {
        idx = str.indexOf(token, from);
        if (idx === -1) return null;
        from = idx + token.length;
    }
    return from;
}

export { isUzPhoneComplete } from '../../utils/phoneFormat'
