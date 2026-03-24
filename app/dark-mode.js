const fs = require('fs');

const file = process.argv[2];
let content = fs.readFileSync(file, 'utf8');

const replacements = {
  'bg-white': 'bg-slate-950',
  'bg-\\[#fcfdfe\\]': 'bg-[#0B0F19]',
  'bg-slate-50': 'bg-slate-900',
  'bg-slate-100': 'bg-slate-800',
  'border-slate-100': 'border-slate-800',
  'border-slate-200': 'border-slate-800',
  'text-slate-900': 'text-white',
  'text-slate-800': 'text-slate-200',
  'text-slate-700': 'text-slate-300',
  'text-slate-600': 'text-slate-400',
  'text-slate-500': 'text-slate-400',
  'text-slate-400': 'text-slate-500',
  'text-slate-300': 'text-slate-600',
  'hover:bg-slate-50': 'hover:bg-slate-800',
  'hover:bg-slate-100': 'hover:bg-slate-800',
  'hover:bg-white': 'hover:bg-slate-800',
  'bg-rose-50': 'bg-rose-500/10',
  'border-rose-100': 'border-rose-500/20',
  'text-rose-700': 'text-rose-400',
  'text-rose-600': 'text-rose-500',
};

const regex = new RegExp(Object.keys(replacements).join('|'), 'g');
content = content.replace(regex, match => replacements[match]);

fs.writeFileSync(file, content, 'utf8');
console.log('Updated ' + file);
