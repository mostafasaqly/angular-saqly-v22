const SHELL_CMDS = new Set(['npm','npx','ng','git','cd','node','ls','mkdir','cp','mv','rm','echo','curl','yarn','pnpm']);
const SHELL_SUBS = new Set(['install','run','build','start','init','add','new','generate','serve','test','deploy','create','update','remove','delete']);
const SHELL_PKGS = new Set(['@angular/core','@angular/cli','@angular/forms','@angular/router','@angular/common','rxjs','typescript','zone.js','express','tailwindcss','primeng','@angular/material']);

const KEYWORDS = /\b(import|export|from|default|const|let|var|function|return|if|else|for|while|class|extends|new|this|typeof|instanceof|async|await|try|catch|throw|interface|type|enum|implements|public|private|protected|readonly|static|abstract|override|declare|namespace|module|in|of|break|continue|switch|case)\b/g;
const BUILTINS = /\b(signal|computed|effect|input|output|model|viewChild|contentChild|inject|Injectable|Component|Directive|Pipe|NgModule|OnInit|OnDestroy|Input|Output|EventEmitter|ChangeDetectionStrategy|HttpClient|Router|ActivatedRoute|FormControl|FormGroup|FormBuilder|signalForm|Validators|resource|rxResource|httpResource|linkedSignal|takeUntilDestroyed|BehaviorSubject|Subject|Observable|of|from|map|filter|switchMap|catchError|tap|firstValueFrom)\b/g;

function escHtml(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlightJS(code: string): string {
  const lines = code.split('\n');
  return lines.map(line => {
    // comments
    const ci = line.indexOf('//');
    if (ci !== -1) {
      const before = line.slice(0, ci);
      const comment = line.slice(ci);
      return tokenizeLine(before) + `<span class="tok-comment">${escHtml(comment)}</span>`;
    }
    return tokenizeLine(line);
  }).join('\n');
}

function applyTokenRegex(html: string): string {
  // Split on existing <span> tags so we only apply keyword/builtin/number
  // regex to plain-text segments, never inside already-emitted HTML.
  const parts = html.split(/(<span[^>]*>.*?<\/span>)/s);
  return parts.map((part, i) => {
    if (i % 2 === 1) return part; // inside a span — leave untouched
    let p = part.replace(KEYWORDS, '<span class="tok-keyword">$1</span>');
    p = p.replace(BUILTINS, '<span class="tok-builtin">$1</span>');
    p = p.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="tok-number">$1</span>');
    return p;
  }).join('');
}

function tokenizeLine(line: string): string {
  let result = '';
  let i = 0;
  while (i < line.length) {
    const ch = line[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      let end = i + 1;
      while (end < line.length && line[end] !== ch) {
        if (line[end] === '\\') end++;
        end++;
      }
      const str = line.slice(i, end + 1);
      result += `<span class="tok-string">${escHtml(str)}</span>`;
      i = end + 1;
      continue;
    }
    if (ch === '<' && /[A-Za-z\/]/.test(line[i+1] || '')) {
      let end = i + 1;
      while (end < line.length && line[end] !== '>' && line[end] !== ' ' && line[end] !== '\n') end++;
      const tag = line.slice(i, end + 1);
      result += `<span class="tok-tag">${escHtml(tag)}</span>`;
      i = end + 1;
      continue;
    }
    result += escHtml(ch);
    i++;
  }
  return applyTokenRegex(result);
}

function highlightShell(code: string): string {
  return code.split('\n').map(line => {
    const trimmed = line.trimStart();
    if (!trimmed) return '';
    const prompt = line.startsWith('$') ? '<span class="tok-sh-prompt">$ </span>' : '';
    const rest = line.startsWith('$') ? line.slice(1).trim() : line;
    const parts = rest.split(/\s+/);
    return prompt + parts.map((p, idx) => {
      if (idx === 0 && SHELL_CMDS.has(p)) return `<span class="tok-sh-cmd">${escHtml(p)}</span>`;
      if (idx === 1 && SHELL_SUBS.has(p)) return `<span class="tok-sh-sub">${escHtml(p)}</span>`;
      if (p.startsWith('-')) return `<span class="tok-sh-flag">${escHtml(p)}</span>`;
      if (SHELL_PKGS.has(p) || (p.includes('/') && !p.startsWith('.'))) return `<span class="tok-sh-pkg">${escHtml(p)}</span>`;
      return escHtml(p);
    }).join(' ');
  }).join('\n');
}

export function highlight(code: string): string {
  const first = code.trim().split(/\s+/)[0];
  if (SHELL_CMDS.has(first) || first === '$') return highlightShell(code);
  return highlightJS(code);
}
