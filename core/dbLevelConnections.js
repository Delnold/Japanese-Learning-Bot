import Level from "level-mem";
const dbLC = Level({ valueEncoding: 'json' })
export default dbLC;