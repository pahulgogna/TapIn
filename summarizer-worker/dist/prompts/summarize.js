"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createSummarizingPrompt;
const summarizePrompt = "given the instruction, perform the <Instruction> on the given <Data>. DO use markdown, structuring the response in an easy to understand method. <Instruction> The given text is a conversation between a team, discussing a topic, you have to convert this conversation into meaningful data that can help the people involved recall what were the important agendas in that meeting. Use bullet points, subheadings, and clear formatting to enhance readability. Extract key concepts, definitions, examples, and any relevant explanations. Organize the information logically, breaking down complex ideas into simpler points. If applicable, include summaries, diagrams (if text-based), or categorized lists to improve clarity. </Instruction> ";
function createSummarizingPrompt(text) {
    return summarizePrompt + " <Data> " + text + " </Data>";
}
;
