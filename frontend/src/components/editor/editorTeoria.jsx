import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mathematics from "@aarkue/tiptap-math-extension";
import { Bold, Italic, Underline, Heading1, Heading2, Pilcrow } from "lucide-react";


const EditorTeoria = ({value, onChange})=>{
    const editor = useEditor({
        extensions:[StarterKit, Mathematics],
        content: value,
        onUpdate({editor}){
            onChange(editor.getHTML());
        }
    });
    if(!editor) return null;
    const insertarFormula = (latex) => {
    editor
        .chain()
        .focus()
        .insertContent(latex)
        .run();
};

const formulas = [
    { label: "x²", latex: "$x^{}$" },
    { label: "xₙ", latex: "$x_{}$" },
    { label: "√", latex: "$\\sqrt{}$" },
    { label: "³√", latex: "$\\sqrt[3]{}$" },
    { label: "a/b", latex: "$\\frac{}{}$" },

    { label: "π", latex: "$\\pi$" },
    { label: "α", latex: "$\\alpha$" },
    { label: "β", latex: "$\\beta$" },
    { label: "γ", latex: "$\\gamma$" },
    { label: "θ", latex: "$\\theta$" },
    { label: "λ", latex: "$\\lambda$" },
    { label: "ρ", latex: "$\\rho$" },

    { label: "≤", latex: "$\\leq$" },
    { label: "≥", latex: "$\\geq$" },
    { label: "≠", latex: "$\\neq$" },
    { label: "≈", latex: "$\\approx$" },
    { label: "∞", latex: "$\\infty$" },

    { label: "→", latex: "$\\rightarrow$" },
    { label: "←", latex: "$\\leftarrow$" },
    { label: "↔", latex: "$\\leftrightarrow$" },

    { label: "Σ", latex: "$\\sum_{}^{}$" },
    { label: "∫", latex: "$\\int_{}^{}$" },
    { label: "lim", latex: "$\\lim_{}$" },
];

    return(
        <div className="border rounded-xl overflow-hidden">
            <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">
                <button
                    type="button"   
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Heading1 size={18}/>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Heading2 size={18}/>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setParagraph().run() } 
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Pilcrow size={18}/>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run() }
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Bold size={18}/>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Italic size={18}/>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run() }
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Underline size={18}/>
                </button>
                <div className="w-full border-t pt-2 mt-2">
                    <p className="text-xs text-gray-500 mb-2 font-medium">
                        Fórmulas LaTeX
                    </p>
                    <div className="flex flex-wrap gap-2">
                    {formulas.map((formula) => (
                        <button
                            key={formula.label}
                            type="button"
                            onClick={() => insertarFormula(formula.latex)}
                            className=" px-3 py-1.5 text-sm border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition">
                
                            {formula.label}
                        </button>
                    ))}
                    </div>
                </div>
            </div>
            <EditorContent
                editor={editor}
                className="min-h-[350px] p-4"/>
        </div>
    );
}

export default EditorTeoria;