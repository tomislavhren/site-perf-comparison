/*! js-cookie v3.0.0-rc.0 | MIT */
'use strict';
!(function (e, t) {
	var a, i;
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = t())
		: 'function' == typeof define && define.amd
		? define(t)
		: ((e = e || self),
		  (a = e.Cookies),
		  ((i = e.Cookies = t()).noConflict = function () {
				return (e.Cookies = a), i;
		  }));
})(this, function () {
	function e(e) {
		for (var t = 1; t < arguments.length; t++) {
			var a = arguments[t];
			for (var i in a) e[i] = a[i];
		}
		return e;
	}
	var t = {
		read: function (e) {
			return e.replace(/%3B/g, ';');
		},
		write: function (e) {
			return e.replace(/;/g, '%3B');
		},
	};
	return (function a(i, n) {
		function r(a, r, s) {
			if ('undefined' != typeof document) {
				'number' == typeof (s = e({}, n, s)).expires &&
					(s.expires = new Date(Date.now() + 864e5 * s.expires)),
					s.expires && (s.expires = s.expires.toUTCString()),
					(a = t.write(a).replace(/=/g, '%3D')),
					(r = i.write(String(r), a));
				var o = '';
				for (var l in s)
					s[l] &&
						((o += '; ' + l), !0 !== s[l] && (o += '=' + s[l].split(';')[0]));
				return (document.cookie = a + '=' + r + o);
			}
		}
		return Object.create(
			{
				set: r,
				get: function (e) {
					if ('undefined' != typeof document && (!arguments.length || e)) {
						for (
							var a = document.cookie ? document.cookie.split('; ') : [],
								n = {},
								r = 0;
							r < a.length;
							r++
						) {
							var s = a[r].split('='),
								o = s.slice(1).join('='),
								l = t.read(s[0]).replace(/%3D/g, '=');
							if (((n[l] = i.read(o, l)), e === l)) break;
						}
						return e ? n[e] : n;
					}
				},
				remove: function (t, a) {
					r(t, '', e({}, a, { expires: -1 }));
				},
				withAttributes: function (t) {
					return a(this.converter, e({}, this.attributes, t));
				},
				withConverter: function (t) {
					return a(e({}, this.converter, t), this.attributes);
				},
			},
			{
				attributes: { value: Object.freeze(n) },
				converter: { value: Object.freeze(i) },
			}
		);
	})(t, { path: '/' });
});
var hljs = (function () {
	function e(t) {
		Object.freeze(t);
		var a = 'function' == typeof t;
		return (
			Object.getOwnPropertyNames(t).forEach(function (i) {
				!Object.hasOwnProperty.call(t, i) ||
					null === t[i] ||
					('object' != typeof t[i] && 'function' != typeof t[i]) ||
					(a && ('caller' === i || 'callee' === i || 'arguments' === i)) ||
					Object.isFrozen(t[i]) ||
					e(t[i]);
			}),
			t
		);
	}
	function t(e) {
		return e
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#x27;');
	}
	function a(e, ...t) {
		var a = {};
		for (const t in e) a[t] = e[t];
		return (
			t.forEach(function (e) {
				for (const t in e) a[t] = e[t];
			}),
			a
		);
	}
	function i(e) {
		return e.nodeName.toLowerCase();
	}
	function n(e) {
		return e ? ('string' == typeof e ? e : e.source) : null;
	}
	function r(e, t) {
		return t
			? +t
			: (function (e) {
					return S.includes(e.toLowerCase());
			  })(e)
			? 0
			: 1;
	}
	class s {
		constructor(e) {
			void 0 === e.data && (e.data = {}), (this.data = e.data);
		}
		ignoreMatch() {
			this.ignore = !0;
		}
	}
	var o = Object.freeze({
		__proto__: null,
		escapeHTML: t,
		inherit: a,
		nodeStream: function (e) {
			var t = [];
			return (
				(function e(a, n) {
					for (var r = a.firstChild; r; r = r.nextSibling)
						3 === r.nodeType
							? (n += r.nodeValue.length)
							: 1 === r.nodeType &&
							  (t.push({ event: 'start', offset: n, node: r }),
							  (n = e(r, n)),
							  i(r).match(/br|hr|img|input/) ||
									t.push({ event: 'stop', offset: n, node: r }));
					return n;
				})(e, 0),
				t
			);
		},
		mergeStreams: function (e, a, n) {
			function r() {
				return e.length && a.length
					? e[0].offset !== a[0].offset
						? e[0].offset < a[0].offset
							? e
							: a
						: 'start' === a[0].event
						? e
						: a
					: e.length
					? e
					: a;
			}
			function s(e) {
				c +=
					'<' +
					i(e) +
					[].map
						.call(e.attributes, function (e) {
							return ' ' + e.nodeName + '="' + t(e.value) + '"';
						})
						.join('') +
					'>';
			}
			function o(e) {
				c += '</' + i(e) + '>';
			}
			function l(e) {
				('start' === e.event ? s : o)(e.node);
			}
			for (var d = 0, c = '', u = []; e.length || a.length; ) {
				var p = r();
				if (
					((c += t(n.substring(d, p[0].offset))), (d = p[0].offset), p === e)
				) {
					u.reverse().forEach(o);
					do {
						l(p.splice(0, 1)[0]), (p = r());
					} while (p === e && p.length && p[0].offset === d);
					u.reverse().forEach(s);
				} else
					'start' === p[0].event ? u.push(p[0].node) : u.pop(),
						l(p.splice(0, 1)[0]);
			}
			return c + t(n.substr(d));
		},
	});
	const l = '</span>',
		d = e => !!e.kind;
	class c {
		constructor(e, t) {
			(this.buffer = ''), (this.classPrefix = t.classPrefix), e.walk(this);
		}
		addText(e) {
			this.buffer += t(e);
		}
		openNode(e) {
			if (!d(e)) return;
			let t = e.kind;
			e.sublanguage || (t = `${this.classPrefix}${t}`), this.span(t);
		}
		closeNode(e) {
			d(e) && (this.buffer += l);
		}
		value() {
			return this.buffer;
		}
		span(e) {
			this.buffer += `<span class="${e}">`;
		}
	}
	class u {
		constructor() {
			(this.rootNode = { children: [] }), (this.stack = [this.rootNode]);
		}
		get top() {
			return this.stack[this.stack.length - 1];
		}
		get root() {
			return this.rootNode;
		}
		add(e) {
			this.top.children.push(e);
		}
		openNode(e) {
			const t = { kind: e, children: [] };
			this.add(t), this.stack.push(t);
		}
		closeNode() {
			if (this.stack.length > 1) return this.stack.pop();
		}
		closeAllNodes() {
			for (; this.closeNode(); );
		}
		toJSON() {
			return JSON.stringify(this.rootNode, null, 4);
		}
		walk(e) {
			return this.constructor._walk(e, this.rootNode);
		}
		static _walk(e, t) {
			return (
				'string' == typeof t
					? e.addText(t)
					: t.children &&
					  (e.openNode(t),
					  t.children.forEach(t => this._walk(e, t)),
					  e.closeNode(t)),
				e
			);
		}
		static _collapse(e) {
			'string' != typeof e &&
				e.children &&
				(e.children.every(e => 'string' == typeof e)
					? (e.children = [e.children.join('')])
					: e.children.forEach(e => {
							u._collapse(e);
					  }));
		}
	}
	class p extends u {
		constructor(e) {
			super(), (this.options = e);
		}
		addKeyword(e, t) {
			'' !== e && (this.openNode(t), this.addText(e), this.closeNode());
		}
		addText(e) {
			'' !== e && this.add(e);
		}
		addSublanguage(e, t) {
			const a = e.root;
			(a.kind = t), (a.sublanguage = !0), this.add(a);
		}
		toHTML() {
			return new c(this, this.options).value();
		}
		finalize() {
			return !0;
		}
	}
	const h =
			'(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)',
		f = { begin: '\\\\[\\s\\S]', relevance: 0 },
		m = {
			className: 'string',
			begin: "'",
			end: "'",
			illegal: '\\n',
			contains: [f],
		},
		g = {
			className: 'string',
			begin: '"',
			end: '"',
			illegal: '\\n',
			contains: [f],
		},
		v = {
			begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
		},
		b = function (e, t, i = {}) {
			var n = a({ className: 'comment', begin: e, end: t, contains: [] }, i);
			return (
				n.contains.push(v),
				n.contains.push({
					className: 'doctag',
					begin: '(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):',
					relevance: 0,
				}),
				n
			);
		},
		y = b('//', '$'),
		w = b('/\\*', '\\*/'),
		E = b('#', '$');
	var x = Object.freeze({
			__proto__: null,
			IDENT_RE: '[a-zA-Z]\\w*',
			UNDERSCORE_IDENT_RE: '[a-zA-Z_]\\w*',
			NUMBER_RE: '\\b\\d+(\\.\\d+)?',
			C_NUMBER_RE: h,
			BINARY_NUMBER_RE: '\\b(0b[01]+)',
			RE_STARTERS_RE:
				'!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~',
			SHEBANG: (e = {}) => {
				const t = /^#![ ]*\//;
				return (
					e.binary &&
						(e.begin = (function (...e) {
							return e.map(e => n(e)).join('');
						})(t, /.*\b/, e.binary, /\b.*/)),
					a(
						{
							'className': 'meta',
							'begin': t,
							'end': /$/,
							'relevance': 0,
							'on:begin': (e, t) => {
								0 !== e.index && t.ignoreMatch();
							},
						},
						e
					)
				);
			},
			BACKSLASH_ESCAPE: f,
			APOS_STRING_MODE: m,
			QUOTE_STRING_MODE: g,
			PHRASAL_WORDS_MODE: v,
			COMMENT: b,
			C_LINE_COMMENT_MODE: y,
			C_BLOCK_COMMENT_MODE: w,
			HASH_COMMENT_MODE: E,
			NUMBER_MODE: {
				className: 'number',
				begin: '\\b\\d+(\\.\\d+)?',
				relevance: 0,
			},
			C_NUMBER_MODE: { className: 'number', begin: h, relevance: 0 },
			BINARY_NUMBER_MODE: {
				className: 'number',
				begin: '\\b(0b[01]+)',
				relevance: 0,
			},
			CSS_NUMBER_MODE: {
				className: 'number',
				begin:
					'\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?',
				relevance: 0,
			},
			REGEXP_MODE: {
				begin: /(?=\/[^/\n]*\/)/,
				contains: [
					{
						className: 'regexp',
						begin: /\//,
						end: /\/[gimuy]*/,
						illegal: /\n/,
						contains: [
							f,
							{ begin: /\[/, end: /\]/, relevance: 0, contains: [f] },
						],
					},
				],
			},
			TITLE_MODE: { className: 'title', begin: '[a-zA-Z]\\w*', relevance: 0 },
			UNDERSCORE_TITLE_MODE: {
				className: 'title',
				begin: '[a-zA-Z_]\\w*',
				relevance: 0,
			},
			METHOD_GUARD: { begin: '\\.\\s*[a-zA-Z_]\\w*', relevance: 0 },
			END_SAME_AS_BEGIN: function (e) {
				return Object.assign(e, {
					'on:begin': (e, t) => {
						t.data._beginMatch = e[1];
					},
					'on:end': (e, t) => {
						t.data._beginMatch !== e[1] && t.ignoreMatch();
					},
				});
			},
		}),
		S = 'of and for in not or if then'.split(' ');
	const T = t,
		C = a,
		{ nodeStream: _, mergeStreams: M } = o,
		k = Symbol('nomatch');
	return (function (t) {
		function i(e) {
			return P.noHighlightRe.test(e);
		}
		function o(e, t, a, i) {
			var n = { code: t, language: e };
			g('before:highlight', n);
			var r = n.result ? n.result : l(n.language, n.code, a, i);
			return (r.code = n.code), g('after:highlight', r), r;
		}
		function l(e, t, i, o) {
			function c(e, t) {
				var a = y.case_insensitive ? t[0].toLowerCase() : t[0];
				return (
					Object.prototype.hasOwnProperty.call(e.keywords, a) && e.keywords[a]
				);
			}
			function u() {
				null != S.subLanguage
					? (function () {
							if ('' !== M) {
								var e = null;
								if ('string' == typeof S.subLanguage) {
									if (!b[S.subLanguage]) return void _.addText(M);
									(e = l(S.subLanguage, M, !0, C[S.subLanguage])),
										(C[S.subLanguage] = e.top);
								} else e = d(M, S.subLanguage.length ? S.subLanguage : null);
								S.relevance > 0 && (N += e.relevance),
									_.addSublanguage(e.emitter, e.language);
							}
					  })()
					: (function () {
							if (!S.keywords) return void _.addText(M);
							let e = 0;
							S.keywordPatternRe.lastIndex = 0;
							let t = S.keywordPatternRe.exec(M),
								a = '';
							for (; t; ) {
								a += M.substring(e, t.index);
								const i = c(S, t);
								if (i) {
									const [e, n] = i;
									_.addText(a), (a = ''), (N += n), _.addKeyword(t[0], e);
								} else a += t[0];
								(e = S.keywordPatternRe.lastIndex),
									(t = S.keywordPatternRe.exec(M));
							}
							(a += M.substr(e)), _.addText(a);
					  })(),
					(M = '');
			}
			function p(e) {
				return (
					e.className && _.openNode(e.className),
					(S = Object.create(e, { parent: { value: S } }))
				);
			}
			function f(e) {
				return 0 === S.matcher.regexIndex ? ((M += e[0]), 1) : ((A = !0), 0);
			}
			function m(t, a) {
				var n = a && a[0];
				if (((M += t), null == n)) return u(), 0;
				if (
					'begin' === v.type &&
					'end' === a.type &&
					v.index === a.index &&
					'' === n
				) {
					if (((M += g.slice(a.index, a.index + 1)), !E)) {
						const t = Error('0 width match regex');
						throw ((t.languageName = e), (t.badRule = v.rule), t);
					}
					return 1;
				}
				if (((v = a), 'begin' === a.type))
					return (function (e) {
						var t = e[0],
							a = e.rule;
						const i = new s(a),
							n = [a.__beforeBegin, a['on:begin']];
						for (const a of n) if (a && (a(e, i), i.ignore)) return f(t);
						return (
							a &&
								a.endSameAsBegin &&
								(a.endRe = RegExp(
									t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
									'm'
								)),
							a.skip
								? (M += t)
								: (a.excludeBegin && (M += t),
								  u(),
								  a.returnBegin || a.excludeBegin || (M = t)),
							p(a),
							a.returnBegin ? 0 : t.length
						);
					})(a);
				if ('illegal' === a.type && !i) {
					const e = Error(
						'Illegal lexeme "' +
							n +
							'" for mode "' +
							(S.className || '<unnamed>') +
							'"'
					);
					throw ((e.mode = S), e);
				}
				if ('end' === a.type) {
					var r = (function (e) {
						var t = e[0],
							a = g.substr(e.index),
							i = (function e(t, a, i) {
								let n = (function (e, t) {
									var a = e && e.exec(t);
									return a && 0 === a.index;
								})(t.endRe, i);
								if (n) {
									if (t['on:end']) {
										const e = new s(t);
										t['on:end'](a, e), e.ignore && (n = !1);
									}
									if (n) {
										for (; t.endsParent && t.parent; ) t = t.parent;
										return t;
									}
								}
								if (t.endsWithParent) return e(t.parent, a, i);
							})(S, e, a);
						if (!i) return k;
						var n = S;
						n.skip
							? (M += t)
							: (n.returnEnd || n.excludeEnd || (M += t),
							  u(),
							  n.excludeEnd && (M = t));
						do {
							S.className && _.closeNode(),
								S.skip || S.subLanguage || (N += S.relevance),
								(S = S.parent);
						} while (S !== i.parent);
						return (
							i.starts &&
								(i.endSameAsBegin && (i.starts.endRe = i.endRe), p(i.starts)),
							n.returnEnd ? 0 : t.length
						);
					})(a);
					if (r !== k) return r;
				}
				if ('illegal' === a.type && '' === n) return 1;
				if (L > 1e5 && L > 3 * a.index)
					throw Error(
						'potential infinite loop, way more iterations than matches'
					);
				return (M += n), n.length;
			}
			var g = t,
				v = {},
				y = h(e);
			if (!y)
				throw (
					(console.error(O.replace('{}', e)),
					Error('Unknown language: "' + e + '"'))
				);
			var w = (function (e) {
					function t(t, a) {
						return RegExp(
							n(t),
							'm' + (e.case_insensitive ? 'i' : '') + (a ? 'g' : '')
						);
					}
					function i(e, t) {
						const a = e.input[e.index - 1],
							i = e.input[e.index + e[0].length];
						('.' !== a && '.' !== i) || t.ignoreMatch();
					}
					class s {
						constructor() {
							(this.matchIndexes = {}),
								(this.regexes = []),
								(this.matchAt = 1),
								(this.position = 0);
						}
						addRule(e, t) {
							(t.position = this.position++),
								(this.matchIndexes[this.matchAt] = t),
								this.regexes.push([t, e]),
								(this.matchAt +=
									(function (e) {
										return RegExp(e.toString() + '|').exec('').length - 1;
									})(e) + 1);
						}
						compile() {
							0 === this.regexes.length && (this.exec = () => null);
							const e = this.regexes.map(e => e[1]);
							(this.matcherRe = t(
								(function (e, t = '|') {
									for (
										var a = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,
											i = 0,
											r = '',
											s = 0;
										s < e.length;
										s++
									) {
										var o = (i += 1),
											l = n(e[s]);
										for (s > 0 && (r += t), r += '('; l.length > 0; ) {
											var d = a.exec(l);
											if (null == d) {
												r += l;
												break;
											}
											(r += l.substring(0, d.index)),
												(l = l.substring(d.index + d[0].length)),
												'\\' === d[0][0] && d[1]
													? (r += '\\' + (+d[1] + o))
													: ((r += d[0]), '(' === d[0] && i++);
										}
										r += ')';
									}
									return r;
								})(e),
								!0
							)),
								(this.lastIndex = 0);
						}
						exec(e) {
							this.matcherRe.lastIndex = this.lastIndex;
							const t = this.matcherRe.exec(e);
							if (!t) return null;
							const a = t.findIndex((e, t) => t > 0 && void 0 !== e),
								i = this.matchIndexes[a];
							return t.splice(0, a), Object.assign(t, i);
						}
					}
					class o {
						constructor() {
							(this.rules = []),
								(this.multiRegexes = []),
								(this.count = 0),
								(this.lastIndex = 0),
								(this.regexIndex = 0);
						}
						getMatcher(e) {
							if (this.multiRegexes[e]) return this.multiRegexes[e];
							const t = new s();
							return (
								this.rules.slice(e).forEach(([e, a]) => t.addRule(e, a)),
								t.compile(),
								(this.multiRegexes[e] = t),
								t
							);
						}
						considerAll() {
							this.regexIndex = 0;
						}
						addRule(e, t) {
							this.rules.push([e, t]), 'begin' === t.type && this.count++;
						}
						exec(e) {
							const t = this.getMatcher(this.regexIndex);
							t.lastIndex = this.lastIndex;
							const a = t.exec(e);
							return (
								a &&
									((this.regexIndex += a.position + 1),
									this.regexIndex === this.count && (this.regexIndex = 0)),
								a
							);
						}
					}
					if (e.contains && e.contains.includes('self'))
						throw Error(
							'ERR: contains `self` is not supported at the top-level of a language.  See documentation.'
						);
					return (function s(l, d) {
						const c = l;
						if (l.compiled) return c;
						(l.compiled = !0),
							(l.__beforeBegin = null),
							(l.keywords = l.keywords || l.beginKeywords);
						let u = null;
						if (
							('object' == typeof l.keywords &&
								((u = l.keywords.$pattern), delete l.keywords.$pattern),
							l.keywords &&
								(l.keywords = (function (e, t) {
									function a(e, a) {
										t && (a = a.toLowerCase()),
											a.split(' ').forEach(function (t) {
												var a = t.split('|');
												i[a[0]] = [e, r(a[0], a[1])];
											});
									}
									var i = {};
									return (
										'string' == typeof e
											? a('keyword', e)
											: Object.keys(e).forEach(function (t) {
													a(t, e[t]);
											  }),
										i
									);
								})(l.keywords, e.case_insensitive)),
							l.lexemes && u)
						)
							throw Error(
								'ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) '
							);
						return (
							(c.keywordPatternRe = t(l.lexemes || u || /\w+/, !0)),
							d &&
								(l.beginKeywords &&
									((l.begin =
										'\\b(' +
										l.beginKeywords.split(' ').join('|') +
										')(?=\\b|\\s)'),
									(l.__beforeBegin = i)),
								l.begin || (l.begin = /\B|\b/),
								(c.beginRe = t(l.begin)),
								l.endSameAsBegin && (l.end = l.begin),
								l.end || l.endsWithParent || (l.end = /\B|\b/),
								l.end && (c.endRe = t(l.end)),
								(c.terminator_end = n(l.end) || ''),
								l.endsWithParent &&
									d.terminator_end &&
									(c.terminator_end += (l.end ? '|' : '') + d.terminator_end)),
							l.illegal && (c.illegalRe = t(l.illegal)),
							void 0 === l.relevance && (l.relevance = 1),
							l.contains || (l.contains = []),
							(l.contains = [].concat(
								...l.contains.map(function (e) {
									return (function (e) {
										return (
											e.variants &&
												!e.cached_variants &&
												(e.cached_variants = e.variants.map(function (t) {
													return a(e, { variants: null }, t);
												})),
											e.cached_variants
												? e.cached_variants
												: (function e(t) {
														return !!t && (t.endsWithParent || e(t.starts));
												  })(e)
												? a(e, { starts: e.starts ? a(e.starts) : null })
												: Object.isFrozen(e)
												? a(e)
												: e
										);
									})('self' === e ? l : e);
								})
							)),
							l.contains.forEach(function (e) {
								s(e, c);
							}),
							l.starts && s(l.starts, d),
							(c.matcher = (function (e) {
								const t = new o();
								return (
									e.contains.forEach(e =>
										t.addRule(e.begin, { rule: e, type: 'begin' })
									),
									e.terminator_end &&
										t.addRule(e.terminator_end, { type: 'end' }),
									e.illegal && t.addRule(e.illegal, { type: 'illegal' }),
									t
								);
							})(c)),
							c
						);
					})(e);
				})(y),
				x = '',
				S = o || w,
				C = {},
				_ = new P.__emitter(P);
			!(function () {
				for (var e = [], t = S; t !== y; t = t.parent)
					t.className && e.unshift(t.className);
				e.forEach(e => _.openNode(e));
			})();
			var M = '',
				N = 0,
				I = 0,
				L = 0,
				A = !1;
			try {
				for (S.matcher.considerAll(); ; ) {
					L++,
						A ? (A = !1) : ((S.matcher.lastIndex = I), S.matcher.considerAll());
					const e = S.matcher.exec(g);
					if (!e) break;
					const t = m(g.substring(I, e.index), e);
					I = e.index + t;
				}
				return (
					m(g.substr(I)),
					_.closeAllNodes(),
					_.finalize(),
					(x = _.toHTML()),
					{
						relevance: N,
						value: x,
						language: e,
						illegal: !1,
						emitter: _,
						top: S,
					}
				);
			} catch (t) {
				if (t.message && t.message.includes('Illegal'))
					return {
						illegal: !0,
						illegalBy: {
							msg: t.message,
							context: g.slice(I - 100, I + 100),
							mode: t.mode,
						},
						sofar: x,
						relevance: 0,
						value: T(g),
						emitter: _,
					};
				if (E)
					return {
						illegal: !1,
						relevance: 0,
						value: T(g),
						emitter: _,
						language: e,
						top: S,
						errorRaised: t,
					};
				throw t;
			}
		}
		function d(e, t) {
			t = t || P.languages || Object.keys(b);
			var a = (function (e) {
					const t = {
						relevance: 0,
						emitter: new P.__emitter(P),
						value: T(e),
						illegal: !1,
						top: N,
					};
					return t.emitter.addText(e), t;
				})(e),
				i = a;
			return (
				t
					.filter(h)
					.filter(m)
					.forEach(function (t) {
						var n = l(t, e, !1);
						(n.language = t),
							n.relevance > i.relevance && (i = n),
							n.relevance > a.relevance && ((i = a), (a = n));
					}),
				i.language && (a.second_best = i),
				a
			);
		}
		function c(e) {
			return P.tabReplace || P.useBR
				? e.replace(S, e =>
						'\n' === e
							? P.useBR
								? '<br>'
								: e
							: P.tabReplace
							? e.replace(/\t/g, P.tabReplace)
							: e
				  )
				: e;
		}
		function u(e) {
			let t = null;
			const a = (function (e) {
				var t = e.className + ' ';
				t += e.parentNode ? e.parentNode.className : '';
				const a = P.languageDetectRe.exec(t);
				if (a) {
					var n = h(a[1]);
					return (
						n ||
							(console.warn(O.replace('{}', a[1])),
							console.warn(
								'Falling back to no-highlight mode for this block.',
								e
							)),
						n ? a[1] : 'no-highlight'
					);
				}
				return t.split(/\s+/).find(e => i(e) || h(e));
			})(e);
			if (i(a)) return;
			g('before:highlightBlock', { block: e, language: a }),
				P.useBR
					? ((t = document.createElement(
							'div'
					  )).innerHTML = e.innerHTML
							.replace(/\n/g, '')
							.replace(/<br[ /]*>/g, '\n'))
					: (t = e);
			const n = t.textContent,
				r = a ? o(a, n, !0) : d(n),
				s = _(t);
			if (s.length) {
				const e = document.createElement('div');
				(e.innerHTML = r.value), (r.value = M(s, _(e), n));
			}
			(r.value = c(r.value)),
				g('after:highlightBlock', { block: e, result: r }),
				(e.innerHTML = r.value),
				(e.className = (function (e, t, a) {
					var i = t ? y[t] : a,
						n = [e.trim()];
					return (
						e.match(/\bhljs\b/) || n.push('hljs'),
						e.includes(i) || n.push(i),
						n.join(' ').trim()
					);
				})(e.className, a, r.language)),
				(e.result = {
					language: r.language,
					re: r.relevance,
					relavance: r.relevance,
				}),
				r.second_best &&
					(e.second_best = {
						language: r.second_best.language,
						re: r.second_best.relevance,
						relavance: r.second_best.relevance,
					});
		}
		function h(e) {
			return (e = (e || '').toLowerCase()), b[e] || b[y[e]];
		}
		function f(e, { languageName: t }) {
			'string' == typeof e && (e = [e]),
				e.forEach(e => {
					y[e] = t;
				});
		}
		function m(e) {
			var t = h(e);
			return t && !t.disableAutodetect;
		}
		function g(e, t) {
			var a = e;
			w.forEach(function (e) {
				e[a] && e[a](t);
			});
		}
		var v = [],
			b = {},
			y = {},
			w = [],
			E = !0,
			S = /(^(<[^>]+>|\t|)+|\n)/gm,
			O =
				"Could not find the language '{}', did you forget to load/include a language module?";
		const N = { disableAutodetect: !0, name: 'Plain text', contains: [] };
		var P = {
			noHighlightRe: /^(no-?highlight)$/i,
			languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
			classPrefix: 'hljs-',
			tabReplace: null,
			useBR: !1,
			languages: null,
			__emitter: p,
		};
		const I = () => {
			if (!I.called) {
				I.called = !0;
				var e = document.querySelectorAll('pre code');
				v.forEach.call(e, u);
			}
		};
		Object.assign(t, {
			highlight: o,
			highlightAuto: d,
			fixMarkup: c,
			highlightBlock: u,
			configure: function (e) {
				P = C(P, e);
			},
			initHighlighting: I,
			initHighlightingOnLoad: function () {
				window.addEventListener('DOMContentLoaded', I, !1);
			},
			registerLanguage: function (e, a) {
				var i = null;
				try {
					i = a(t);
				} catch (a) {
					if (
						(console.error(
							"Language definition for '{}' could not be registered.".replace(
								'{}',
								e
							)
						),
						!E)
					)
						throw a;
					console.error(a), (i = N);
				}
				i.name || (i.name = e),
					(b[e] = i),
					(i.rawDefinition = a.bind(null, t)),
					i.aliases && f(i.aliases, { languageName: e });
			},
			listLanguages: function () {
				return Object.keys(b);
			},
			getLanguage: h,
			registerAliases: f,
			requireLanguage: function (e) {
				var t = h(e);
				if (t) return t;
				throw Error(
					"The '{}' language is required, but not loaded.".replace('{}', e)
				);
			},
			autoDetection: m,
			inherit: C,
			addPlugin: function (e) {
				w.push(e);
			},
		}),
			(t.debugMode = function () {
				E = !1;
			}),
			(t.safeMode = function () {
				E = !0;
			}),
			(t.versionString = '10.1.1');
		for (const t in x) 'object' == typeof x[t] && e(x[t]);
		return Object.assign(t, x), t;
	})({});
})();
'object' == typeof exports &&
	'undefined' != typeof module &&
	(module.exports = hljs),
	hljs.registerLanguage(
		'ini',
		(function () {
			function e(e) {
				return e ? ('string' == typeof e ? e : e.source) : null;
			}
			function t(...t) {
				return t.map(t => e(t)).join('');
			}
			return function (a) {
				var i = {
						className: 'number',
						relevance: 0,
						variants: [
							{ begin: /([\+\-]+)?[\d]+_[\d_]+/ },
							{ begin: a.NUMBER_RE },
						],
					},
					n = a.COMMENT();
				n.variants = [
					{ begin: /;/, end: /$/ },
					{ begin: /#/, end: /$/ },
				];
				var r = {
						className: 'variable',
						variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)}/ }],
					},
					s = { className: 'literal', begin: /\bon|off|true|false|yes|no\b/ },
					o = {
						className: 'string',
						contains: [a.BACKSLASH_ESCAPE],
						variants: [
							{ begin: "'''", end: "'''", relevance: 10 },
							{ begin: '"""', end: '"""', relevance: 10 },
							{ begin: '"', end: '"' },
							{ begin: "'", end: "'" },
						],
					},
					l = {
						begin: /\[/,
						end: /\]/,
						contains: [n, s, r, o, i, 'self'],
						relevance: 0,
					},
					d =
						'(' +
						[/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/]
							.map(t => e(t))
							.join('|') +
						')';
				return {
					name: 'TOML, also INI',
					aliases: ['toml'],
					case_insensitive: !0,
					illegal: /\S/,
					contains: [
						n,
						{ className: 'section', begin: /\[+/, end: /\]+/ },
						{
							begin: t(
								d,
								'(\\s*\\.\\s*',
								d,
								')*',
								t('(?=', /\s*=\s*[^#\s]/, ')')
							),
							className: 'attr',
							starts: { end: /$/, contains: [n, l, s, r, o, i] },
						},
					],
				};
			};
		})()
	),
	hljs.registerLanguage('json', function (e) {
		var t = { literal: 'true false null' },
			a = [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
			i = [e.QUOTE_STRING_MODE, e.C_NUMBER_MODE],
			n = {
				end: ',',
				endsWithParent: !0,
				excludeEnd: !0,
				contains: i,
				keywords: t,
			},
			r = {
				begin: '{',
				end: '}',
				contains: [
					{
						className: 'attr',
						begin: /"/,
						end: /"/,
						contains: [e.BACKSLASH_ESCAPE],
						illegal: '\\n',
					},
					e.inherit(n, { begin: /:/ }),
				].concat(a),
				illegal: '\\S',
			},
			s = {
				begin: '\\[',
				end: '\\]',
				contains: [e.inherit(n)],
				illegal: '\\S',
			};
		return (
			i.push(r, s),
			a.forEach(function (e) {
				i.push(e);
			}),
			{ name: 'JSON', contains: i, keywords: t, illegal: '\\S' }
		);
	}),
	hljs.registerLanguage('xml', function (e) {
		var t = { className: 'symbol', begin: '&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;' },
			a = {
				begin: '\\s',
				contains: [
					{
						className: 'meta-keyword',
						begin: '#?[a-z_][a-z1-9_-]+',
						illegal: '\\n',
					},
				],
			},
			i = e.inherit(a, { begin: '\\(', end: '\\)' }),
			n = e.inherit(e.APOS_STRING_MODE, { className: 'meta-string' }),
			r = e.inherit(e.QUOTE_STRING_MODE, { className: 'meta-string' }),
			s = {
				endsWithParent: !0,
				illegal: /</,
				relevance: 0,
				contains: [
					{ className: 'attr', begin: '[A-Za-z0-9\\._:-]+', relevance: 0 },
					{
						begin: /=\s*/,
						relevance: 0,
						contains: [
							{
								className: 'string',
								endsParent: !0,
								variants: [
									{ begin: /"/, end: /"/, contains: [t] },
									{ begin: /'/, end: /'/, contains: [t] },
									{ begin: /[^\s"'=<>`]+/ },
								],
							},
						],
					},
				],
			};
		return {
			name: 'HTML, XML',
			aliases: [
				'html',
				'xhtml',
				'rss',
				'atom',
				'xjb',
				'xsd',
				'xsl',
				'plist',
				'wsf',
				'svg',
			],
			case_insensitive: !0,
			contains: [
				{
					className: 'meta',
					begin: '<![a-z]',
					end: '>',
					relevance: 10,
					contains: [
						a,
						r,
						n,
						i,
						{
							begin: '\\[',
							end: '\\]',
							contains: [
								{
									className: 'meta',
									begin: '<![a-z]',
									end: '>',
									contains: [a, i, r, n],
								},
							],
						},
					],
				},
				e.COMMENT('\x3c!--', '--\x3e', { relevance: 10 }),
				{ begin: '<\\!\\[CDATA\\[', end: '\\]\\]>', relevance: 10 },
				t,
				{ className: 'meta', begin: /<\?xml/, end: /\?>/, relevance: 10 },
				{
					className: 'tag',
					begin: '<style(?=\\s|>)',
					end: '>',
					keywords: { name: 'style' },
					contains: [s],
					starts: {
						end: '</style>',
						returnEnd: !0,
						subLanguage: ['css', 'xml'],
					},
				},
				{
					className: 'tag',
					begin: '<script(?=\\s|>)',
					end: '>',
					keywords: { name: 'script' },
					contains: [s],
					starts: {
						end: '</script>',
						returnEnd: !0,
						subLanguage: ['javascript', 'handlebars', 'xml'],
					},
				},
				{
					className: 'tag',
					begin: '</?',
					end: '/?>',
					contains: [
						{ className: 'name', begin: /[^\/><\s]+/, relevance: 0 },
						s,
					],
				},
			],
		};
	}),
	hljs.registerLanguage('markdown', function (e) {
		const t = { begin: '<', end: '>', subLanguage: 'xml', relevance: 0 },
			a = {
				begin: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
				returnBegin: !0,
				contains: [
					{
						className: 'string',
						begin: '\\[',
						end: '\\]',
						excludeBegin: !0,
						returnEnd: !0,
						relevance: 0,
					},
					{
						className: 'link',
						begin: '\\]\\(',
						end: '\\)',
						excludeBegin: !0,
						excludeEnd: !0,
					},
					{
						className: 'symbol',
						begin: '\\]\\[',
						end: '\\]',
						excludeBegin: !0,
						excludeEnd: !0,
					},
				],
				relevance: 10,
			},
			i = {
				className: 'strong',
				contains: [],
				variants: [
					{ begin: /_{2}/, end: /_{2}/ },
					{ begin: /\*{2}/, end: /\*{2}/ },
				],
			},
			n = {
				className: 'emphasis',
				contains: [],
				variants: [
					{ begin: /\*(?!\*)/, end: /\*/ },
					{ begin: /_(?!_)/, end: /_/, relevance: 0 },
				],
			};
		i.contains.push(n), n.contains.push(i);
		var r = [t, a];
		return (
			(i.contains = i.contains.concat(r)),
			(n.contains = n.contains.concat(r)),
			{
				name: 'Markdown',
				aliases: ['md', 'mkdown', 'mkd'],
				contains: [
					{
						className: 'section',
						variants: [
							{ begin: '^#{1,6}', end: '$', contains: (r = r.concat(i, n)) },
							{
								begin: '(?=^.+?\\n[=-]{2,}$)',
								contains: [
									{ begin: '^[=-]*$' },
									{ begin: '^', end: '\\n', contains: r },
								],
							},
						],
					},
					t,
					{
						className: 'bullet',
						begin: '^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)',
						end: '\\s+',
						excludeEnd: !0,
					},
					i,
					n,
					{ className: 'quote', begin: '^>\\s+', contains: r, end: '$' },
					{
						className: 'code',
						variants: [
							{ begin: '(`{3,})(.|\\n)*?\\1`*[ ]*' },
							{ begin: '(~{3,})(.|\\n)*?\\1~*[ ]*' },
							{ begin: '```', end: '```+[ ]*$' },
							{ begin: '~~~', end: '~~~+[ ]*$' },
							{ begin: '`.+?`' },
							{
								begin: '(?=^( {4}|\\t))',
								contains: [{ begin: '^( {4}|\\t)', end: '(\\n)$' }],
								relevance: 0,
							},
						],
					},
					{ begin: '^[-\\*]{3,}', end: '$' },
					a,
					{
						begin: /^\[[^\n]+\]:/,
						returnBegin: !0,
						contains: [
							{
								className: 'symbol',
								begin: /\[/,
								end: /\]/,
								excludeBegin: !0,
								excludeEnd: !0,
							},
							{ className: 'link', begin: /:\s*/, end: /$/, excludeBegin: !0 },
						],
					},
				],
			}
		);
	}),
	hljs.registerLanguage('php', function (e) {
		var t = { begin: '\\$+[a-zA-Z_-Ã¿][a-zA-Z0-9_-Ã¿]*' },
			a = {
				className: 'meta',
				variants: [
					{ begin: /<\?php/, relevance: 10 },
					{ begin: /<\?[=]?/ },
					{ begin: /\?>/ },
				],
			},
			i = {
				className: 'string',
				contains: [e.BACKSLASH_ESCAPE, a],
				variants: [
					{ begin: 'b"', end: '"' },
					{ begin: "b'", end: "'" },
					e.inherit(e.APOS_STRING_MODE, { illegal: null }),
					e.inherit(e.QUOTE_STRING_MODE, { illegal: null }),
				],
			},
			n = { variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE] },
			r = {
				keyword:
					'__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list new object or private protected public real return string switch throw trait try unset use var void while xor yield',
				literal: 'false null true',
				built_in:
					'Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Throwable Traversable WeakReference Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass',
			};
		return {
			aliases: ['php', 'php3', 'php4', 'php5', 'php6', 'php7'],
			case_insensitive: !0,
			keywords: r,
			contains: [
				e.HASH_COMMENT_MODE,
				e.COMMENT('//', '$', { contains: [a] }),
				e.COMMENT('/\\*', '\\*/', {
					contains: [{ className: 'doctag', begin: '@[A-Za-z]+' }],
				}),
				e.COMMENT('__halt_compiler.+?;', !1, {
					endsWithParent: !0,
					keywords: '__halt_compiler',
				}),
				{
					className: 'string',
					begin: /<<<['"]?\w+['"]?$/,
					end: /^\w+;?$/,
					contains: [
						e.BACKSLASH_ESCAPE,
						{
							className: 'subst',
							variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }],
						},
					],
				},
				a,
				{ className: 'keyword', begin: /\$this\b/ },
				t,
				{ begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ },
				{
					className: 'function',
					beginKeywords: 'fn function',
					end: /[;{]/,
					excludeEnd: !0,
					illegal: '[$%\\[]',
					contains: [
						e.UNDERSCORE_TITLE_MODE,
						{
							className: 'params',
							begin: '\\(',
							end: '\\)',
							excludeBegin: !0,
							excludeEnd: !0,
							keywords: r,
							contains: ['self', t, e.C_BLOCK_COMMENT_MODE, i, n],
						},
					],
				},
				{
					className: 'class',
					beginKeywords: 'class interface',
					end: '{',
					excludeEnd: !0,
					illegal: /[:\(\$"]/,
					contains: [
						{ beginKeywords: 'extends implements' },
						e.UNDERSCORE_TITLE_MODE,
					],
				},
				{
					beginKeywords: 'namespace',
					end: ';',
					illegal: /[\.']/,
					contains: [e.UNDERSCORE_TITLE_MODE],
				},
				{ beginKeywords: 'use', end: ';', contains: [e.UNDERSCORE_TITLE_MODE] },
				{ begin: '=>' },
				i,
				n,
			],
		};
	}),
	hljs.registerLanguage('php-template', function (e) {
		return {
			name: 'PHP template',
			subLanguage: 'xml',
			contains: [
				{
					begin: /<\?(php|=)?/,
					end: /\?>/,
					subLanguage: 'php',
					contains: [
						{ begin: '/\\*', end: '\\*/', skip: !0 },
						{ begin: 'b"', end: '"', skip: !0 },
						{ begin: "b'", end: "'", skip: !0 },
						e.inherit(e.APOS_STRING_MODE, {
							illegal: null,
							className: null,
							contains: null,
							skip: !0,
						}),
						e.inherit(e.QUOTE_STRING_MODE, {
							illegal: null,
							className: null,
							contains: null,
							skip: !0,
						}),
					],
				},
			],
		};
	}),
	hljs.registerLanguage('nginx', function (e) {
		var t = {
				className: 'variable',
				variants: [
					{ begin: /\$\d+/ },
					{ begin: /\$\{/, end: /}/ },
					{ begin: '[\\$\\@]' + e.UNDERSCORE_IDENT_RE },
				],
			},
			a = {
				endsWithParent: !0,
				keywords: {
					$pattern: '[a-z/_]+',
					literal:
						'on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll',
				},
				relevance: 0,
				illegal: '=>',
				contains: [
					e.HASH_COMMENT_MODE,
					{
						className: 'string',
						contains: [e.BACKSLASH_ESCAPE, t],
						variants: [
							{ begin: /"/, end: /"/ },
							{ begin: /'/, end: /'/ },
						],
					},
					{
						begin: '([a-z]+):/',
						end: '\\s',
						endsWithParent: !0,
						excludeEnd: !0,
						contains: [t],
					},
					{
						className: 'regexp',
						contains: [e.BACKSLASH_ESCAPE, t],
						variants: [
							{ begin: '\\s\\^', end: '\\s|{|;', returnEnd: !0 },
							{ begin: '~\\*?\\s+', end: '\\s|{|;', returnEnd: !0 },
							{ begin: '\\*(\\.[a-z\\-]+)+' },
							{ begin: '([a-z\\-]+\\.)+\\*' },
						],
					},
					{
						className: 'number',
						begin:
							'\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b',
					},
					{
						className: 'number',
						begin: '\\b\\d+[kKmMgGdshdwy]*\\b',
						relevance: 0,
					},
					t,
				],
			};
		return {
			name: 'Nginx config',
			aliases: ['nginxconf'],
			contains: [
				e.HASH_COMMENT_MODE,
				{
					begin: e.UNDERSCORE_IDENT_RE + '\\s+{',
					returnBegin: !0,
					end: '{',
					contains: [{ className: 'section', begin: e.UNDERSCORE_IDENT_RE }],
					relevance: 0,
				},
				{
					begin: e.UNDERSCORE_IDENT_RE + '\\s',
					end: ';|{',
					returnBegin: !0,
					contains: [
						{ className: 'attribute', begin: e.UNDERSCORE_IDENT_RE, starts: a },
					],
					relevance: 0,
				},
			],
			illegal: '[^\\s\\}]',
		};
	}),
	hljs.registerLanguage(
		'javascript',
		(function () {
			function e(e) {
				return t('(?=', e, ')');
			}
			function t(...e) {
				return e
					.map(e =>
						(function (e) {
							return e ? ('string' == typeof e ? e : e.source) : null;
						})(e)
					)
					.join('');
			}
			const a = [
					'as',
					'in',
					'of',
					'if',
					'for',
					'while',
					'finally',
					'var',
					'new',
					'function',
					'do',
					'return',
					'void',
					'else',
					'break',
					'catch',
					'instanceof',
					'with',
					'throw',
					'case',
					'default',
					'try',
					'switch',
					'continue',
					'typeof',
					'delete',
					'let',
					'yield',
					'const',
					'class',
					'debugger',
					'async',
					'await',
					'static',
					'import',
					'from',
					'export',
					'extends',
				],
				i = ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
				n = [].concat(
					[
						'setInterval',
						'setTimeout',
						'clearInterval',
						'clearTimeout',
						'require',
						'exports',
						'eval',
						'isFinite',
						'isNaN',
						'parseFloat',
						'parseInt',
						'decodeURI',
						'decodeURIComponent',
						'encodeURI',
						'encodeURIComponent',
						'escape',
						'unescape',
					],
					[
						'arguments',
						'this',
						'super',
						'console',
						'window',
						'document',
						'localStorage',
						'module',
						'global',
					],
					[
						'Intl',
						'DataView',
						'Number',
						'Math',
						'Date',
						'String',
						'RegExp',
						'Object',
						'Function',
						'Boolean',
						'Error',
						'Symbol',
						'Set',
						'Map',
						'WeakSet',
						'WeakMap',
						'Proxy',
						'Reflect',
						'JSON',
						'Promise',
						'Float64Array',
						'Int16Array',
						'Int32Array',
						'Int8Array',
						'Uint16Array',
						'Uint32Array',
						'Float32Array',
						'Array',
						'Uint8Array',
						'Uint8ClampedArray',
						'ArrayBuffer',
					],
					[
						'EvalError',
						'InternalError',
						'RangeError',
						'ReferenceError',
						'SyntaxError',
						'TypeError',
						'URIError',
					]
				);
			return function (r) {
				var s = '[A-Za-z$_][0-9A-Za-z$_]*',
					o = {
						begin: /<[A-Za-z0-9\\._:-]+/,
						end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
					},
					l = {
						$pattern: '[A-Za-z$_][0-9A-Za-z$_]*',
						keyword: a.join(' '),
						literal: i.join(' '),
						built_in: n.join(' '),
					},
					d = {
						className: 'number',
						variants: [
							{ begin: '\\b(0[bB][01]+)n?' },
							{ begin: '\\b(0[oO][0-7]+)n?' },
							{ begin: r.C_NUMBER_RE + 'n?' },
						],
						relevance: 0,
					},
					c = {
						className: 'subst',
						begin: '\\$\\{',
						end: '\\}',
						keywords: l,
						contains: [],
					},
					u = {
						begin: 'html`',
						end: '',
						starts: {
							end: '`',
							returnEnd: !1,
							contains: [r.BACKSLASH_ESCAPE, c],
							subLanguage: 'xml',
						},
					},
					p = {
						begin: 'css`',
						end: '',
						starts: {
							end: '`',
							returnEnd: !1,
							contains: [r.BACKSLASH_ESCAPE, c],
							subLanguage: 'css',
						},
					},
					h = {
						className: 'string',
						begin: '`',
						end: '`',
						contains: [r.BACKSLASH_ESCAPE, c],
					};
				c.contains = [
					r.APOS_STRING_MODE,
					r.QUOTE_STRING_MODE,
					u,
					p,
					h,
					d,
					r.REGEXP_MODE,
				];
				var f = c.contains.concat([
						{
							begin: /\(/,
							end: /\)/,
							contains: ['self'].concat(c.contains, [
								r.C_BLOCK_COMMENT_MODE,
								r.C_LINE_COMMENT_MODE,
							]),
						},
						r.C_BLOCK_COMMENT_MODE,
						r.C_LINE_COMMENT_MODE,
					]),
					m = {
						className: 'params',
						begin: /\(/,
						end: /\)/,
						excludeBegin: !0,
						excludeEnd: !0,
						contains: f,
					};
				return {
					name: 'JavaScript',
					aliases: ['js', 'jsx', 'mjs', 'cjs'],
					keywords: l,
					contains: [
						r.SHEBANG({ binary: 'node', relevance: 5 }),
						{
							className: 'meta',
							relevance: 10,
							begin: /^\s*['"]use (strict|asm)['"]/,
						},
						r.APOS_STRING_MODE,
						r.QUOTE_STRING_MODE,
						u,
						p,
						h,
						r.C_LINE_COMMENT_MODE,
						r.COMMENT('/\\*\\*', '\\*/', {
							relevance: 0,
							contains: [
								{
									className: 'doctag',
									begin: '@[A-Za-z]+',
									contains: [
										{
											className: 'type',
											begin: '\\{',
											end: '\\}',
											relevance: 0,
										},
										{
											className: 'variable',
											begin: s + '(?=\\s*(-)|$)',
											endsParent: !0,
											relevance: 0,
										},
										{ begin: /(?=[^\n])\s/, relevance: 0 },
									],
								},
							],
						}),
						r.C_BLOCK_COMMENT_MODE,
						d,
						{
							begin: t(
								/[{,\n]\s*/,
								e(t(/(((\/\/.*)|(\/\*(.|\n)*\*\/))\s*)*/, s + '\\s*:'))
							),
							relevance: 0,
							contains: [
								{ className: 'attr', begin: s + e('\\s*:'), relevance: 0 },
							],
						},
						{
							begin: '(' + r.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
							keywords: 'return throw case',
							contains: [
								r.C_LINE_COMMENT_MODE,
								r.C_BLOCK_COMMENT_MODE,
								r.REGEXP_MODE,
								{
									className: 'function',
									begin:
										'(\\([^(]*(\\([^(]*(\\([^(]*\\))?\\))?\\)|' +
										r.UNDERSCORE_IDENT_RE +
										')\\s*=>',
									returnBegin: !0,
									end: '\\s*=>',
									contains: [
										{
											className: 'params',
											variants: [
												{ begin: r.UNDERSCORE_IDENT_RE },
												{ className: null, begin: /\(\s*\)/, skip: !0 },
												{
													begin: /\(/,
													end: /\)/,
													excludeBegin: !0,
													excludeEnd: !0,
													keywords: l,
													contains: f,
												},
											],
										},
									],
								},
								{ begin: /,/, relevance: 0 },
								{ className: '', begin: /\s/, end: /\s*/, skip: !0 },
								{
									variants: [
										{ begin: '<>', end: '</>' },
										{ begin: o.begin, end: o.end },
									],
									subLanguage: 'xml',
									contains: [
										{
											begin: o.begin,
											end: o.end,
											skip: !0,
											contains: ['self'],
										},
									],
								},
							],
							relevance: 0,
						},
						{
							className: 'function',
							beginKeywords: 'function',
							end: /\{/,
							excludeEnd: !0,
							contains: [r.inherit(r.TITLE_MODE, { begin: s }), m],
							illegal: /\[|%/,
						},
						{ begin: /\$[(.]/ },
						r.METHOD_GUARD,
						{
							className: 'class',
							beginKeywords: 'class',
							end: /[{;=]/,
							excludeEnd: !0,
							illegal: /[:"\[\]]/,
							contains: [{ beginKeywords: 'extends' }, r.UNDERSCORE_TITLE_MODE],
						},
						{ beginKeywords: 'constructor', end: /\{/, excludeEnd: !0 },
						{
							begin: '(get|set)\\s+(?=' + s + '\\()',
							end: /{/,
							keywords: 'get set',
							contains: [
								r.inherit(r.TITLE_MODE, { begin: s }),
								{ begin: /\(\)/ },
								m,
							],
						},
					],
					illegal: /#(?!!)/,
				};
			};
		})()
	),
	hljs.registerLanguage('python', function (e) {
		var t = {
				keyword:
					'and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10',
				built_in: 'Ellipsis NotImplemented',
				literal: 'False None True',
			},
			a = { className: 'meta', begin: /^(>>>|\.\.\.) / },
			i = {
				className: 'subst',
				begin: /\{/,
				end: /\}/,
				keywords: t,
				illegal: /#/,
			},
			n = { begin: /\{\{/, relevance: 0 },
			r = {
				className: 'string',
				contains: [e.BACKSLASH_ESCAPE],
				variants: [
					{
						begin: /(u|b)?r?'''/,
						end: /'''/,
						contains: [e.BACKSLASH_ESCAPE, a],
						relevance: 10,
					},
					{
						begin: /(u|b)?r?"""/,
						end: /"""/,
						contains: [e.BACKSLASH_ESCAPE, a],
						relevance: 10,
					},
					{
						begin: /(fr|rf|f)'''/,
						end: /'''/,
						contains: [e.BACKSLASH_ESCAPE, a, n, i],
					},
					{
						begin: /(fr|rf|f)"""/,
						end: /"""/,
						contains: [e.BACKSLASH_ESCAPE, a, n, i],
					},
					{ begin: /(u|r|ur)'/, end: /'/, relevance: 10 },
					{ begin: /(u|r|ur)"/, end: /"/, relevance: 10 },
					{ begin: /(b|br)'/, end: /'/ },
					{ begin: /(b|br)"/, end: /"/ },
					{
						begin: /(fr|rf|f)'/,
						end: /'/,
						contains: [e.BACKSLASH_ESCAPE, n, i],
					},
					{
						begin: /(fr|rf|f)"/,
						end: /"/,
						contains: [e.BACKSLASH_ESCAPE, n, i],
					},
					e.APOS_STRING_MODE,
					e.QUOTE_STRING_MODE,
				],
			},
			s = {
				className: 'number',
				relevance: 0,
				variants: [
					{ begin: e.BINARY_NUMBER_RE + '[lLjJ]?' },
					{ begin: '\\b(0o[0-7]+)[lLjJ]?' },
					{ begin: e.C_NUMBER_RE + '[lLjJ]?' },
				],
			},
			o = {
				className: 'params',
				variants: [
					{ begin: /\(\s*\)/, skip: !0, className: null },
					{
						begin: /\(/,
						end: /\)/,
						excludeBegin: !0,
						excludeEnd: !0,
						contains: ['self', a, s, r, e.HASH_COMMENT_MODE],
					},
				],
			};
		return (
			(i.contains = [r, s, a]),
			{
				name: 'Python',
				aliases: ['py', 'gyp', 'ipython'],
				keywords: t,
				illegal: /(<\/|->|\?)|=>/,
				contains: [
					a,
					s,
					{ beginKeywords: 'if', relevance: 0 },
					r,
					e.HASH_COMMENT_MODE,
					{
						variants: [
							{ className: 'function', beginKeywords: 'def' },
							{ className: 'class', beginKeywords: 'class' },
						],
						end: /:/,
						illegal: /[${=;\n,]/,
						contains: [
							e.UNDERSCORE_TITLE_MODE,
							o,
							{ begin: /->/, endsWithParent: !0, keywords: 'None' },
						],
					},
					{ className: 'meta', begin: /^[\t ]*@/, end: /$/ },
					{ begin: /\b(print|exec)\(/ },
				],
			}
		);
	}),
	hljs.registerLanguage('scss', function (e) {
		var t = { className: 'variable', begin: '(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b' },
			a = { className: 'number', begin: '#[0-9A-Fa-f]+' };
		return (
			e.CSS_NUMBER_MODE,
			e.QUOTE_STRING_MODE,
			e.APOS_STRING_MODE,
			e.C_BLOCK_COMMENT_MODE,
			{
				name: 'SCSS',
				case_insensitive: !0,
				illegal: "[=/|']",
				contains: [
					e.C_LINE_COMMENT_MODE,
					e.C_BLOCK_COMMENT_MODE,
					{
						className: 'selector-id',
						begin: '\\#[A-Za-z0-9_-]+',
						relevance: 0,
					},
					{
						className: 'selector-class',
						begin: '\\.[A-Za-z0-9_-]+',
						relevance: 0,
					},
					{
						className: 'selector-attr',
						begin: '\\[',
						end: '\\]',
						illegal: '$',
					},
					{
						className: 'selector-tag',
						begin:
							'\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
						relevance: 0,
					},
					{
						className: 'selector-pseudo',
						begin:
							':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)',
					},
					{
						className: 'selector-pseudo',
						begin:
							'::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)',
					},
					t,
					{
						className: 'attribute',
						begin:
							'\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
						illegal: '[^\\s]',
					},
					{
						begin:
							'\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b',
					},
					{
						begin: ':',
						end: ';',
						contains: [
							t,
							a,
							e.CSS_NUMBER_MODE,
							e.QUOTE_STRING_MODE,
							e.APOS_STRING_MODE,
							{ className: 'meta', begin: '!important' },
						],
					},
					{
						begin: '@(page|font-face)',
						lexemes: '@[a-z-]+',
						keywords: '@page @font-face',
					},
					{
						begin: '@',
						end: '[{;]',
						returnBegin: !0,
						keywords: 'and or not only',
						contains: [
							{ begin: '@[a-z-]+', className: 'keyword' },
							t,
							e.QUOTE_STRING_MODE,
							e.APOS_STRING_MODE,
							a,
							e.CSS_NUMBER_MODE,
						],
					},
				],
			}
		);
	}),
	hljs.registerLanguage('http', function (e) {
		var t = 'HTTP/[0-9\\.]+';
		return {
			name: 'HTTP',
			aliases: ['https'],
			illegal: '\\S',
			contains: [
				{
					begin: '^' + t,
					end: '$',
					contains: [{ className: 'number', begin: '\\b\\d{3}\\b' }],
				},
				{
					begin: '^[A-Z]+ (.*?) ' + t + '$',
					returnBegin: !0,
					end: '$',
					contains: [
						{
							className: 'string',
							begin: ' ',
							end: ' ',
							excludeBegin: !0,
							excludeEnd: !0,
						},
						{ begin: t },
						{ className: 'keyword', begin: '[A-Z]+' },
					],
				},
				{
					className: 'attribute',
					begin: '^\\w',
					end: ': ',
					excludeEnd: !0,
					illegal: '\\n|\\s|=',
					starts: { end: '$', relevance: 0 },
				},
				{ begin: '\\n\\n', starts: { subLanguage: [], endsWithParent: !0 } },
			],
		};
	}),
	hljs.registerLanguage(
		'java',
		(function () {
			function e(e) {
				return e ? ('string' == typeof e ? e : e.source) : null;
			}
			function t(e) {
				return a('(', e, ')?');
			}
			function a(...t) {
				return t.map(t => e(t)).join('');
			}
			function i(...t) {
				return '(' + t.map(t => e(t)).join('|') + ')';
			}
			return function (e) {
				var n =
						'false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do',
					r = {
						className: 'meta',
						begin: '@[Ã€-Ê¸a-zA-Z_$][Ã€-Ê¸a-zA-Z_$0-9]*',
						contains: [{ begin: /\(/, end: /\)/, contains: ['self'] }],
					},
					s = e => a('[', e, ']+([', e, '_]*[', e, ']+)?'),
					o = {
						className: 'number',
						variants: [
							{ begin: `\\b(0[bB]${s('01')})[lL]?` },
							{ begin: `\\b(0${s('0-7')})[dDfFlL]?` },
							{
								begin: a(
									/\b0[xX]/,
									i(
										a(s('a-fA-F0-9'), /\./, s('a-fA-F0-9')),
										a(s('a-fA-F0-9'), /\.?/),
										a(/\./, s('a-fA-F0-9'))
									),
									/([pP][+-]?(\d+))?/,
									/[fFdDlL]?/
								),
							},
							{
								begin: a(
									/\b/,
									i(a(/\d*\./, s('\\d')), s('\\d')),
									/[eE][+-]?[\d]+[dDfF]?/
								),
							},
							{ begin: a(/\b/, s(/\d/), t(/\.?/), t(s(/\d/)), /[dDfFlL]?/) },
						],
						relevance: 0,
					};
				return {
					name: 'Java',
					aliases: ['jsp'],
					keywords: n,
					illegal: /<\/|#/,
					contains: [
						e.COMMENT('/\\*\\*', '\\*/', {
							relevance: 0,
							contains: [
								{ begin: /\w+@/, relevance: 0 },
								{ className: 'doctag', begin: '@[A-Za-z]+' },
							],
						}),
						e.C_LINE_COMMENT_MODE,
						e.C_BLOCK_COMMENT_MODE,
						e.APOS_STRING_MODE,
						e.QUOTE_STRING_MODE,
						{
							className: 'class',
							beginKeywords: 'class interface',
							end: /[{;=]/,
							excludeEnd: !0,
							keywords: 'class interface',
							illegal: /[:"\[\]]/,
							contains: [
								{ beginKeywords: 'extends implements' },
								e.UNDERSCORE_TITLE_MODE,
							],
						},
						{ beginKeywords: 'new throw return else', relevance: 0 },
						{
							className: 'function',
							begin:
								'([Ã€-Ê¸a-zA-Z_$][Ã€-Ê¸a-zA-Z_$0-9]*(<[Ã€-Ê¸a-zA-Z_$][Ã€-Ê¸a-zA-Z_$0-9]*(\\s*,\\s*[Ã€-Ê¸a-zA-Z_$][Ã€-Ê¸a-zA-Z_$0-9]*)*>)?\\s+)+' +
								e.UNDERSCORE_IDENT_RE +
								'\\s*\\(',
							returnBegin: !0,
							end: /[{;=]/,
							excludeEnd: !0,
							keywords: n,
							contains: [
								{
									begin: e.UNDERSCORE_IDENT_RE + '\\s*\\(',
									returnBegin: !0,
									relevance: 0,
									contains: [e.UNDERSCORE_TITLE_MODE],
								},
								{
									className: 'params',
									begin: /\(/,
									end: /\)/,
									keywords: n,
									relevance: 0,
									contains: [
										r,
										e.APOS_STRING_MODE,
										e.QUOTE_STRING_MODE,
										e.C_NUMBER_MODE,
										e.C_BLOCK_COMMENT_MODE,
									],
								},
								e.C_LINE_COMMENT_MODE,
								e.C_BLOCK_COMMENT_MODE,
							],
						},
						o,
						r,
					],
				};
			};
		})()
	),
	hljs.registerLanguage(
		'typescript',
		(function () {
			const e = [
					'as',
					'in',
					'of',
					'if',
					'for',
					'while',
					'finally',
					'var',
					'new',
					'function',
					'do',
					'return',
					'void',
					'else',
					'break',
					'catch',
					'instanceof',
					'with',
					'throw',
					'case',
					'default',
					'try',
					'switch',
					'continue',
					'typeof',
					'delete',
					'let',
					'yield',
					'const',
					'class',
					'debugger',
					'async',
					'await',
					'static',
					'import',
					'from',
					'export',
					'extends',
				],
				t = ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
				a = [].concat(
					[
						'setInterval',
						'setTimeout',
						'clearInterval',
						'clearTimeout',
						'require',
						'exports',
						'eval',
						'isFinite',
						'isNaN',
						'parseFloat',
						'parseInt',
						'decodeURI',
						'decodeURIComponent',
						'encodeURI',
						'encodeURIComponent',
						'escape',
						'unescape',
					],
					[
						'arguments',
						'this',
						'super',
						'console',
						'window',
						'document',
						'localStorage',
						'module',
						'global',
					],
					[
						'Intl',
						'DataView',
						'Number',
						'Math',
						'Date',
						'String',
						'RegExp',
						'Object',
						'Function',
						'Boolean',
						'Error',
						'Symbol',
						'Set',
						'Map',
						'WeakSet',
						'WeakMap',
						'Proxy',
						'Reflect',
						'JSON',
						'Promise',
						'Float64Array',
						'Int16Array',
						'Int32Array',
						'Int8Array',
						'Uint16Array',
						'Uint32Array',
						'Float32Array',
						'Array',
						'Uint8Array',
						'Uint8ClampedArray',
						'ArrayBuffer',
					],
					[
						'EvalError',
						'InternalError',
						'RangeError',
						'ReferenceError',
						'SyntaxError',
						'TypeError',
						'URIError',
					]
				);
			return function (i) {
				var n = {
						$pattern: '[A-Za-z$_][0-9A-Za-z$_]*',
						keyword: e
							.concat([
								'type',
								'namespace',
								'typedef',
								'interface',
								'public',
								'private',
								'protected',
								'implements',
								'declare',
								'abstract',
								'readonly',
							])
							.join(' '),
						literal: t.join(' '),
						built_in: a
							.concat([
								'any',
								'void',
								'number',
								'boolean',
								'string',
								'object',
								'never',
								'enum',
							])
							.join(' '),
					},
					r = { className: 'meta', begin: '@[A-Za-z$_][0-9A-Za-z$_]*' },
					s = {
						className: 'number',
						variants: [
							{ begin: '\\b(0[bB][01]+)n?' },
							{ begin: '\\b(0[oO][0-7]+)n?' },
							{ begin: i.C_NUMBER_RE + 'n?' },
						],
						relevance: 0,
					},
					o = {
						className: 'subst',
						begin: '\\$\\{',
						end: '\\}',
						keywords: n,
						contains: [],
					},
					l = {
						begin: 'html`',
						end: '',
						starts: {
							end: '`',
							returnEnd: !1,
							contains: [i.BACKSLASH_ESCAPE, o],
							subLanguage: 'xml',
						},
					},
					d = {
						begin: 'css`',
						end: '',
						starts: {
							end: '`',
							returnEnd: !1,
							contains: [i.BACKSLASH_ESCAPE, o],
							subLanguage: 'css',
						},
					},
					c = {
						className: 'string',
						begin: '`',
						end: '`',
						contains: [i.BACKSLASH_ESCAPE, o],
					};
				o.contains = [
					i.APOS_STRING_MODE,
					i.QUOTE_STRING_MODE,
					l,
					d,
					c,
					s,
					i.REGEXP_MODE,
				];
				var u = {
						begin: '\\(',
						end: /\)/,
						keywords: n,
						contains: [
							'self',
							i.QUOTE_STRING_MODE,
							i.APOS_STRING_MODE,
							i.NUMBER_MODE,
						],
					},
					p = {
						className: 'params',
						begin: /\(/,
						end: /\)/,
						excludeBegin: !0,
						excludeEnd: !0,
						keywords: n,
						contains: [i.C_LINE_COMMENT_MODE, i.C_BLOCK_COMMENT_MODE, r, u],
					};
				return {
					name: 'TypeScript',
					aliases: ['ts'],
					keywords: n,
					contains: [
						i.SHEBANG(),
						{ className: 'meta', begin: /^\s*['"]use strict['"]/ },
						i.APOS_STRING_MODE,
						i.QUOTE_STRING_MODE,
						l,
						d,
						c,
						i.C_LINE_COMMENT_MODE,
						i.C_BLOCK_COMMENT_MODE,
						s,
						{
							begin: '(' + i.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
							keywords: 'return throw case',
							contains: [
								i.C_LINE_COMMENT_MODE,
								i.C_BLOCK_COMMENT_MODE,
								i.REGEXP_MODE,
								{
									className: 'function',
									begin:
										'(\\([^(]*(\\([^(]*(\\([^(]*\\))?\\))?\\)|' +
										i.UNDERSCORE_IDENT_RE +
										')\\s*=>',
									returnBegin: !0,
									end: '\\s*=>',
									contains: [
										{
											className: 'params',
											variants: [
												{ begin: i.UNDERSCORE_IDENT_RE },
												{ className: null, begin: /\(\s*\)/, skip: !0 },
												{
													begin: /\(/,
													end: /\)/,
													excludeBegin: !0,
													excludeEnd: !0,
													keywords: n,
													contains: u.contains,
												},
											],
										},
									],
								},
							],
							relevance: 0,
						},
						{
							className: 'function',
							beginKeywords: 'function',
							end: /[\{;]/,
							excludeEnd: !0,
							keywords: n,
							contains: [
								'self',
								i.inherit(i.TITLE_MODE, { begin: '[A-Za-z$_][0-9A-Za-z$_]*' }),
								p,
							],
							illegal: /%/,
							relevance: 0,
						},
						{
							beginKeywords: 'constructor',
							end: /[\{;]/,
							excludeEnd: !0,
							contains: ['self', p],
						},
						{
							begin: /module\./,
							keywords: { built_in: 'module' },
							relevance: 0,
						},
						{ beginKeywords: 'module', end: /\{/, excludeEnd: !0 },
						{
							beginKeywords: 'interface',
							end: /\{/,
							excludeEnd: !0,
							keywords: 'interface extends',
						},
						{ begin: /\$[(.]/ },
						{ begin: '\\.' + i.IDENT_RE, relevance: 0 },
						r,
						u,
					],
				};
			};
		})()
	),
	hljs.registerLanguage('sql', function (e) {
		var t = e.COMMENT('--', '$');
		return {
			name: 'SQL',
			case_insensitive: !0,
			illegal: /[<>{}*]/,
			contains: [
				{
					beginKeywords:
						'begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with',
					end: /;/,
					endsWithParent: !0,
					keywords: {
						$pattern: /[\w\.]+/,
						keyword:
							'as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek',
						literal: 'true false null unknown',
						built_in:
							'array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void',
					},
					contains: [
						{
							className: 'string',
							begin: "'",
							end: "'",
							contains: [{ begin: "''" }],
						},
						{
							className: 'string',
							begin: '"',
							end: '"',
							contains: [{ begin: '""' }],
						},
						{ className: 'string', begin: '`', end: '`' },
						e.C_NUMBER_MODE,
						e.C_BLOCK_COMMENT_MODE,
						t,
						e.HASH_COMMENT_MODE,
					],
				},
				e.C_BLOCK_COMMENT_MODE,
				t,
				e.HASH_COMMENT_MODE,
			],
		};
	}),
	hljs.registerLanguage('css', function (e) {
		var t = {
			begin: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,
			returnBegin: !0,
			end: ';',
			endsWithParent: !0,
			contains: [
				{
					className: 'attribute',
					begin: /\S/,
					end: ':',
					excludeEnd: !0,
					starts: {
						endsWithParent: !0,
						excludeEnd: !0,
						contains: [
							{
								begin: /[\w-]+\(/,
								returnBegin: !0,
								contains: [
									{ className: 'built_in', begin: /[\w-]+/ },
									{
										begin: /\(/,
										end: /\)/,
										contains: [
											e.APOS_STRING_MODE,
											e.QUOTE_STRING_MODE,
											e.CSS_NUMBER_MODE,
										],
									},
								],
							},
							e.CSS_NUMBER_MODE,
							e.QUOTE_STRING_MODE,
							e.APOS_STRING_MODE,
							e.C_BLOCK_COMMENT_MODE,
							{ className: 'number', begin: '#[0-9A-Fa-f]+' },
							{ className: 'meta', begin: '!important' },
						],
					},
				},
			],
		};
		return {
			name: 'CSS',
			case_insensitive: !0,
			illegal: /[=\/|'\$]/,
			contains: [
				e.C_BLOCK_COMMENT_MODE,
				{ className: 'selector-id', begin: /#[A-Za-z0-9_-]+/ },
				{ className: 'selector-class', begin: /\.[A-Za-z0-9_-]+/ },
				{
					className: 'selector-attr',
					begin: /\[/,
					end: /\]/,
					illegal: '$',
					contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE],
				},
				{
					className: 'selector-pseudo',
					begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/,
				},
				{
					begin: '@(page|font-face)',
					lexemes: '@[a-z-]+',
					keywords: '@page @font-face',
				},
				{
					begin: '@',
					end: '[{;]',
					illegal: /:/,
					returnBegin: !0,
					contains: [
						{ className: 'keyword', begin: /@\-?\w[\w]*(\-\w+)*/ },
						{
							begin: /\s/,
							endsWithParent: !0,
							excludeEnd: !0,
							relevance: 0,
							keywords: 'and or not only',
							contains: [
								{ begin: /[a-z-]+:/, className: 'attribute' },
								e.APOS_STRING_MODE,
								e.QUOTE_STRING_MODE,
								e.CSS_NUMBER_MODE,
							],
						},
					],
				},
				{
					className: 'selector-tag',
					begin: '[a-zA-Z-][a-zA-Z0-9_-]*',
					relevance: 0,
				},
				{
					begin: '{',
					end: '}',
					illegal: /\S/,
					contains: [e.C_BLOCK_COMMENT_MODE, t],
				},
			],
		};
	}),
	hljs.registerLanguage('go', function (e) {
		var t = {
			keyword:
				'break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune',
			literal: 'true false iota nil',
			built_in:
				'append cap close complex copy imag len make new panic print println real recover delete',
		};
		return {
			name: 'Go',
			aliases: ['golang'],
			keywords: t,
			illegal: '</',
			contains: [
				e.C_LINE_COMMENT_MODE,
				e.C_BLOCK_COMMENT_MODE,
				{
					className: 'string',
					variants: [
						e.QUOTE_STRING_MODE,
						e.APOS_STRING_MODE,
						{ begin: '`', end: '`' },
					],
				},
				{
					className: 'number',
					variants: [
						{ begin: e.C_NUMBER_RE + '[i]', relevance: 1 },
						e.C_NUMBER_MODE,
					],
				},
				{ begin: /:=/ },
				{
					className: 'function',
					beginKeywords: 'func',
					end: '\\s*(\\{|$)',
					excludeEnd: !0,
					contains: [
						e.TITLE_MODE,
						{
							className: 'params',
							begin: /\(/,
							end: /\)/,
							keywords: t,
							illegal: /["']/,
						},
					],
				},
			],
		};
	}),
	hljs.registerLanguage('plaintext', function (e) {
		return {
			name: 'Plain text',
			aliases: ['text', 'txt'],
			disableAutodetect: !0,
		};
	}),
	(function (e, t) {
		'object' == typeof exports && 'undefined' != typeof module
			? t(exports)
			: 'function' == typeof define && define.amd
			? define(['exports'], t)
			: t(((e = e || self).Popper = {}));
	})(this, function (e) {
		function t(e) {
			return {
				width: (e = e.getBoundingClientRect()).width,
				height: e.height,
				top: e.top,
				right: e.right,
				bottom: e.bottom,
				left: e.left,
				x: e.left,
				y: e.top,
			};
		}
		function a(e) {
			return '[object Window]' !== e.toString()
				? (e = e.ownerDocument)
					? e.defaultView
					: window
				: e;
		}
		function i(e) {
			return { scrollLeft: (e = a(e)).pageXOffset, scrollTop: e.pageYOffset };
		}
		function n(e) {
			return e instanceof a(e).Element || e instanceof Element;
		}
		function r(e) {
			return e instanceof a(e).HTMLElement || e instanceof HTMLElement;
		}
		function s(e) {
			return e ? (e.nodeName || '').toLowerCase() : null;
		}
		function o(e) {
			return (n(e) ? e.ownerDocument : e.document).documentElement;
		}
		function l(e) {
			return t(o(e)).left + i(e).scrollLeft;
		}
		function d(e) {
			return a(e).getComputedStyle(e);
		}
		function c(e) {
			return (
				(e = d(e)),
				/auto|scroll|overlay|hidden/.test(
					e.overflow + e.overflowY + e.overflowX
				)
			);
		}
		function u(e, n, d) {
			void 0 === d && (d = !1);
			var u = o(n);
			e = t(e);
			var p = { scrollLeft: 0, scrollTop: 0 },
				h = { x: 0, y: 0 };
			return (
				d ||
					(('body' !== s(n) || c(u)) &&
						(p =
							n !== a(n) && r(n)
								? { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop }
								: i(n)),
					r(n)
						? (((h = t(n)).x += n.clientLeft), (h.y += n.clientTop))
						: u && (h.x = l(u))),
				{
					x: e.left + p.scrollLeft - h.x,
					y: e.top + p.scrollTop - h.y,
					width: e.width,
					height: e.height,
				}
			);
		}
		function p(e) {
			return {
				x: e.offsetLeft,
				y: e.offsetTop,
				width: e.offsetWidth,
				height: e.offsetHeight,
			};
		}
		function h(e) {
			return 'html' === s(e)
				? e
				: e.assignedSlot || e.parentNode || e.host || o(e);
		}
		function f(e, t) {
			void 0 === t && (t = []);
			var i = (function e(t) {
				return 0 <= ['html', 'body', '#document'].indexOf(s(t))
					? t.ownerDocument.body
					: r(t) && c(t)
					? t
					: e(h(t));
			})(e);
			e = 'body' === s(i);
			var n = a(i);
			return (
				(i = e ? [n].concat(n.visualViewport || [], c(i) ? i : []) : i),
				(t = t.concat(i)),
				e ? t : t.concat(f(h(i)))
			);
		}
		function m(e) {
			return r(e) && 'fixed' !== d(e).position ? e.offsetParent : null;
		}
		function g(e) {
			var t = a(e);
			for (e = m(e); e && 0 <= ['table', 'td', 'th'].indexOf(s(e)); ) e = m(e);
			return e && 'body' === s(e) && 'static' === d(e).position ? t : e || t;
		}
		function v(e) {
			var t = new Map(),
				a = new Set(),
				i = [];
			return (
				e.forEach(function (e) {
					t.set(e.name, e);
				}),
				e.forEach(function (e) {
					a.has(e.name) ||
						(function e(n) {
							a.add(n.name),
								[]
									.concat(n.requires || [], n.requiresIfExists || [])
									.forEach(function (i) {
										a.has(i) || ((i = t.get(i)) && e(i));
									}),
								i.push(n);
						})(e);
				}),
				i
			);
		}
		function b(e) {
			var t;
			return function () {
				return (
					t ||
						(t = new Promise(function (a) {
							Promise.resolve().then(function () {
								(t = void 0), a(e());
							});
						})),
					t
				);
			};
		}
		function y(e) {
			return e.split('-')[0];
		}
		function w() {
			for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
				t[a] = arguments[a];
			return !t.some(function (e) {
				return !(e && 'function' == typeof e.getBoundingClientRect);
			});
		}
		function E(e) {
			void 0 === e && (e = {});
			var t = e.defaultModifiers,
				a = void 0 === t ? [] : t,
				i = void 0 === (e = e.defaultOptions) ? H : e;
			return function (e, t, r) {
				function s() {
					l.forEach(function (e) {
						return e();
					}),
						(l = []);
				}
				void 0 === r && (r = i);
				var o = {
						placement: 'bottom',
						orderedModifiers: [],
						options: Object.assign({}, H, {}, i),
						modifiersData: {},
						elements: { reference: e, popper: t },
						attributes: {},
						styles: {},
					},
					l = [],
					d = !1,
					c = {
						state: o,
						setOptions: function (r) {
							return (
								s(),
								(o.options = Object.assign({}, i, {}, o.options, {}, r)),
								(o.scrollParents = {
									reference: n(e)
										? f(e)
										: e.contextElement
										? f(e.contextElement)
										: [],
									popper: f(t),
								}),
								(r = (function (e) {
									var t = v(e);
									return B.reduce(function (e, a) {
										return e.concat(
											t.filter(function (e) {
												return e.phase === a;
											})
										);
									}, []);
								})(
									(function (e) {
										var t = e.reduce(function (e, t) {
											var a = e[t.name];
											return (
												(e[t.name] = a
													? Object.assign({}, a, {}, t, {
															options: Object.assign(
																{},
																a.options,
																{},
																t.options
															),
															data: Object.assign({}, a.data, {}, t.data),
													  })
													: t),
												e
											);
										}, {});
										return Object.keys(t).map(function (e) {
											return t[e];
										});
									})([].concat(a, o.options.modifiers))
								)),
								(o.orderedModifiers = r.filter(function (e) {
									return e.enabled;
								})),
								o.orderedModifiers.forEach(function (e) {
									var t = e.name,
										a = e.options;
									(a = void 0 === a ? {} : a),
										'function' == typeof (e = e.effect) &&
											((t = e({ state: o, name: t, instance: c, options: a })),
											l.push(t || function () {}));
								}),
								c.update()
							);
						},
						forceUpdate: function () {
							if (!d) {
								var e = o.elements,
									t = e.reference;
								if (w(t, (e = e.popper)))
									for (
										o.rects = {
											reference: u(t, g(e), 'fixed' === o.options.strategy),
											popper: p(e),
										},
											o.reset = !1,
											o.placement = o.options.placement,
											o.orderedModifiers.forEach(function (e) {
												return (o.modifiersData[e.name] = Object.assign(
													{},
													e.data
												));
											}),
											t = 0;
										t < o.orderedModifiers.length;
										t++
									)
										if (!0 === o.reset) (o.reset = !1), (t = -1);
										else {
											var a = o.orderedModifiers[t];
											e = a.fn;
											var i = a.options;
											(i = void 0 === i ? {} : i),
												(a = a.name),
												'function' == typeof e &&
													(o =
														e({ state: o, options: i, name: a, instance: c }) ||
														o);
										}
							}
						},
						update: b(function () {
							return new Promise(function (e) {
								c.forceUpdate(), e(o);
							});
						}),
						destroy: function () {
							s(), (d = !0);
						},
					};
				return w(e, t)
					? (c.setOptions(r).then(function (e) {
							!d && r.onFirstUpdate && r.onFirstUpdate(e);
					  }),
					  c)
					: c;
			};
		}
		function x(e) {
			return 0 <= ['top', 'bottom'].indexOf(e) ? 'x' : 'y';
		}
		function S(e) {
			var t = e.reference,
				a = e.element,
				i = (e = e.placement) ? y(e) : null;
			e = e ? e.split('-')[1] : null;
			var n = t.x + t.width / 2 - a.width / 2,
				r = t.y + t.height / 2 - a.height / 2;
			switch (i) {
				case 'top':
					n = { x: n, y: t.y - a.height };
					break;
				case 'bottom':
					n = { x: n, y: t.y + t.height };
					break;
				case 'right':
					n = { x: t.x + t.width, y: r };
					break;
				case 'left':
					n = { x: t.x - a.width, y: r };
					break;
				default:
					n = { x: t.x, y: t.y };
			}
			if (null != (i = i ? x(i) : null))
				switch (((r = 'y' === i ? 'height' : 'width'), e)) {
					case 'start':
						n[i] = Math.floor(n[i]) - Math.floor(t[r] / 2 - a[r] / 2);
						break;
					case 'end':
						n[i] = Math.floor(n[i]) + Math.ceil(t[r] / 2 - a[r] / 2);
				}
			return n;
		}
		function T(e) {
			var t,
				i = e.popper,
				n = e.popperRect,
				r = e.placement,
				s = e.offsets,
				l = e.position,
				d = e.gpuAcceleration,
				c = e.adaptive,
				u = window.devicePixelRatio || 1;
			(e = Math.round(s.x * u) / u || 0), (u = Math.round(s.y * u) / u || 0);
			var p = s.hasOwnProperty('x');
			s = s.hasOwnProperty('y');
			var h,
				f = 'left',
				m = 'top',
				v = window;
			if (c) {
				var b = g(i);
				b === a(i) && (b = o(i)),
					'top' === r &&
						((m = 'bottom'),
						(u -= b.clientHeight - n.height),
						(u *= d ? 1 : -1)),
					'left' === r &&
						((f = 'right'), (e -= b.clientWidth - n.width), (e *= d ? 1 : -1));
			}
			return (
				(i = Object.assign({ position: l }, c && G)),
				d
					? Object.assign(
							{},
							i,
							(((h = {})[m] = s ? '0' : ''),
							(h[f] = p ? '0' : ''),
							(h.transform =
								2 > (v.devicePixelRatio || 1)
									? 'translate(' + e + 'px, ' + u + 'px)'
									: 'translate3d(' + e + 'px, ' + u + 'px, 0)'),
							h)
					  )
					: Object.assign(
							{},
							i,
							(((t = {})[m] = s ? u + 'px' : ''),
							(t[f] = p ? e + 'px' : ''),
							(t.transform = ''),
							t)
					  )
			);
		}
		function C(e) {
			return e.replace(/left|right|bottom|top/g, function (e) {
				return q[e];
			});
		}
		function _(e) {
			return e.replace(/start|end/g, function (e) {
				return F[e];
			});
		}
		function M(e, t) {
			var a = !(!t.getRootNode || !t.getRootNode().host);
			if (e.contains(t)) return !0;
			if (a)
				do {
					if (t && e.isSameNode(t)) return !0;
					t = t.parentNode || t.host;
				} while (t);
			return !1;
		}
		function k(e) {
			return Object.assign({}, e, {
				left: e.x,
				top: e.y,
				right: e.x + e.width,
				bottom: e.y + e.height,
			});
		}
		function O(e, n) {
			if ('viewport' === n) {
				var s = a(e);
				(e = s.visualViewport),
					(n = s.innerWidth),
					(s = s.innerHeight),
					e &&
						/iPhone|iPod|iPad/.test(navigator.platform) &&
						((n = e.width), (s = e.height)),
					(e = k({ width: n, height: s, x: 0, y: 0 }));
			} else r(n) ? (e = t(n)) : ((e = a((s = o(e)))), (n = i(s)), ((s = u(o(s), e)).height = Math.max(s.height, e.innerHeight)), (s.width = Math.max(s.width, e.innerWidth)), (s.x = -n.scrollLeft), (s.y = -n.scrollTop), (e = k(s)));
			return e;
		}
		function N(e, t, i) {
			return (
				(t =
					'clippingParents' === t
						? (function (e) {
								var t = f(e),
									a =
										0 <= ['absolute', 'fixed'].indexOf(d(e).position) && r(e)
											? g(e)
											: e;
								return n(a)
									? t.filter(function (e) {
											return n(e) && M(e, a);
									  })
									: [];
						  })(e)
						: [].concat(t)),
				((i = (i = [].concat(t, [i])).reduce(function (t, i) {
					var n = O(e, i),
						c = a((i = r(i) ? i : o(e))),
						u = r(i) ? d(i) : {};
					parseFloat(u.borderTopWidth);
					var p = parseFloat(u.borderRightWidth) || 0,
						h = parseFloat(u.borderBottomWidth) || 0,
						f = parseFloat(u.borderLeftWidth) || 0;
					u = 'html' === s(i);
					var m = l(i),
						g = i.clientWidth + p,
						v = i.clientHeight + h;
					return (
						u && 50 < c.innerHeight - i.clientHeight && (v = c.innerHeight - h),
						(h = u ? 0 : i.clientTop),
						(p =
							i.clientLeft > f
								? p
								: u
								? c.innerWidth - g - m
								: i.offsetWidth - g),
						(c = u ? c.innerHeight - v : i.offsetHeight - v),
						(i = u ? m : i.clientLeft),
						(t.top = Math.max(n.top + h, t.top)),
						(t.right = Math.min(n.right - p, t.right)),
						(t.bottom = Math.min(n.bottom - c, t.bottom)),
						(t.left = Math.max(n.left + i, t.left)),
						t
					);
				}, O(e, i[0]))).width = i.right - i.left),
				(i.height = i.bottom - i.top),
				(i.x = i.left),
				(i.y = i.top),
				i
			);
		}
		function P(e) {
			return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, {}, e);
		}
		function I(e, t) {
			return t.reduce(function (t, a) {
				return (t[a] = e), t;
			}, {});
		}
		function L(e, a) {
			void 0 === a && (a = {});
			var i = a;
			a = void 0 === (a = i.placement) ? e.placement : a;
			var r = i.boundary,
				s = void 0 === r ? 'clippingParents' : r,
				l = void 0 === (r = i.rootBoundary) ? 'viewport' : r;
			r = void 0 === (r = i.elementContext) ? 'popper' : r;
			var d = i.altBoundary,
				c = void 0 !== d && d;
			i = P(
				'number' != typeof (i = void 0 === (i = i.padding) ? 0 : i)
					? i
					: I(i, z)
			);
			var u = e.elements.reference;
			(d = e.rects.popper),
				(s = N(
					n((c = e.elements[c ? ('popper' === r ? 'reference' : 'popper') : r]))
						? c
						: c.contextElement || o(e.elements.popper),
					s,
					l
				)),
				(c = S({
					reference: (l = t(u)),
					element: d,
					strategy: 'absolute',
					placement: a,
				})),
				(d = k(Object.assign({}, d, {}, c))),
				(l = 'popper' === r ? d : l);
			var p = {
				top: s.top - l.top + i.top,
				bottom: l.bottom - s.bottom + i.bottom,
				left: s.left - l.left + i.left,
				right: l.right - s.right + i.right,
			};
			if (((e = e.modifiersData.offset), 'popper' === r && e)) {
				var h = e[a];
				Object.keys(p).forEach(function (e) {
					var t = 0 <= ['right', 'bottom'].indexOf(e) ? 1 : -1,
						a = 0 <= ['top', 'bottom'].indexOf(e) ? 'y' : 'x';
					p[e] += h[a] * t;
				});
			}
			return p;
		}
		function A(e, t, a) {
			return (
				void 0 === a && (a = { x: 0, y: 0 }),
				{
					top: e.top - t.height - a.y,
					right: e.right - t.width + a.x,
					bottom: e.bottom - t.height + a.y,
					left: e.left - t.width - a.x,
				}
			);
		}
		function D(e) {
			return ['top', 'right', 'bottom', 'left'].some(function (t) {
				return 0 <= e[t];
			});
		}
		var z = ['top', 'bottom', 'right', 'left'],
			R = z.reduce(function (e, t) {
				return e.concat([t + '-start', t + '-end']);
			}, []),
			$ = [].concat(z, ['auto']).reduce(function (e, t) {
				return e.concat([t, t + '-start', t + '-end']);
			}, []),
			B = 'beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite'.split(
				' '
			),
			H = { placement: 'bottom', modifiers: [], strategy: 'absolute' },
			j = { passive: !0 },
			G = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' },
			q = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
			F = { start: 'end', end: 'start' },
			U = [
				{
					name: 'eventListeners',
					enabled: !0,
					phase: 'write',
					fn: function () {},
					effect: function (e) {
						var t = e.state,
							i = e.instance,
							n = (e = e.options).scroll,
							r = void 0 === n || n,
							s = void 0 === (e = e.resize) || e,
							o = a(t.elements.popper),
							l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
						return (
							r &&
								l.forEach(function (e) {
									e.addEventListener('scroll', i.update, j);
								}),
							s && o.addEventListener('resize', i.update, j),
							function () {
								r &&
									l.forEach(function (e) {
										e.removeEventListener('scroll', i.update, j);
									}),
									s && o.removeEventListener('resize', i.update, j);
							}
						);
					},
					data: {},
				},
				{
					name: 'popperOffsets',
					enabled: !0,
					phase: 'read',
					fn: function (e) {
						var t = e.state;
						t.modifiersData[e.name] = S({
							reference: t.rects.reference,
							element: t.rects.popper,
							strategy: 'absolute',
							placement: t.placement,
						});
					},
					data: {},
				},
				{
					name: 'computeStyles',
					enabled: !0,
					phase: 'beforeWrite',
					fn: function (e) {
						var t = e.state,
							a = e.options;
						(e = void 0 === (e = a.gpuAcceleration) || e),
							(a = void 0 === (a = a.adaptive) || a),
							(e = {
								placement: y(t.placement),
								popper: t.elements.popper,
								popperRect: t.rects.popper,
								gpuAcceleration: e,
							}),
							null != t.modifiersData.popperOffsets &&
								(t.styles.popper = Object.assign(
									{},
									t.styles.popper,
									{},
									T(
										Object.assign({}, e, {
											offsets: t.modifiersData.popperOffsets,
											position: t.options.strategy,
											adaptive: a,
										})
									)
								)),
							null != t.modifiersData.arrow &&
								(t.styles.arrow = Object.assign(
									{},
									t.styles.arrow,
									{},
									T(
										Object.assign({}, e, {
											offsets: t.modifiersData.arrow,
											position: 'absolute',
											adaptive: !1,
										})
									)
								)),
							(t.attributes.popper = Object.assign({}, t.attributes.popper, {
								'data-popper-placement': t.placement,
							}));
					},
					data: {},
				},
				{
					name: 'applyStyles',
					enabled: !0,
					phase: 'write',
					fn: function (e) {
						var t = e.state;
						Object.keys(t.elements).forEach(function (e) {
							var a = t.styles[e] || {},
								i = t.attributes[e] || {},
								n = t.elements[e];
							r(n) &&
								s(n) &&
								(Object.assign(n.style, a),
								Object.keys(i).forEach(function (e) {
									var t = i[e];
									!1 === t
										? n.removeAttribute(e)
										: n.setAttribute(e, !0 === t ? '' : t);
								}));
						});
					},
					effect: function (e) {
						var t = e.state,
							a = {
								popper: {
									position: t.options.strategy,
									left: '0',
									top: '0',
									margin: '0',
								},
								arrow: { position: 'absolute' },
								reference: {},
							};
						return (
							Object.assign(t.elements.popper.style, a.popper),
							t.elements.arrow &&
								Object.assign(t.elements.arrow.style, a.arrow),
							function () {
								Object.keys(t.elements).forEach(function (e) {
									var i = t.elements[e],
										n = t.attributes[e] || {};
									(e = Object.keys(
										t.styles.hasOwnProperty(e) ? t.styles[e] : a[e]
									).reduce(function (e, t) {
										return (e[t] = ''), e;
									}, {})),
										r(i) &&
											s(i) &&
											(Object.assign(i.style, e),
											Object.keys(n).forEach(function (e) {
												i.removeAttribute(e);
											}));
								});
							}
						);
					},
					requires: ['computeStyles'],
				},
				{
					name: 'offset',
					enabled: !0,
					phase: 'main',
					requires: ['popperOffsets'],
					fn: function (e) {
						var t = e.state,
							a = e.name,
							i = void 0 === (e = e.options.offset) ? [0, 0] : e,
							n = (e = $.reduce(function (e, a) {
								var n = t.rects,
									r = y(a),
									s = 0 <= ['left', 'top'].indexOf(r) ? -1 : 1,
									o =
										'function' == typeof i
											? i(Object.assign({}, n, { placement: a }))
											: i;
								return (
									(n = (n = o[0]) || 0),
									(o = ((o = o[1]) || 0) * s),
									(r =
										0 <= ['left', 'right'].indexOf(r)
											? { x: o, y: n }
											: { x: n, y: o }),
									(e[a] = r),
									e
								);
							}, {}))[t.placement],
							r = n.x;
						(n = n.y),
							null != t.modifiersData.popperOffsets &&
								((t.modifiersData.popperOffsets.x += r),
								(t.modifiersData.popperOffsets.y += n)),
							(t.modifiersData[a] = e);
					},
				},
				{
					name: 'flip',
					enabled: !0,
					phase: 'main',
					fn: function (e) {
						var t = e.state,
							a = e.options;
						if (((e = e.name), !t.modifiersData[e]._skip)) {
							var i = a.mainAxis;
							i = void 0 === i || i;
							var n = a.altAxis;
							n = void 0 === n || n;
							var r = a.fallbackPlacements,
								s = a.padding,
								o = a.boundary,
								l = a.rootBoundary,
								d = a.altBoundary,
								c = a.flipVariations,
								u = void 0 === c || c,
								p = a.allowedAutoPlacements;
							(c = y((a = t.options.placement))),
								(r =
									r ||
									(c !== a && u
										? (function (e) {
												if ('auto' === y(e)) return [];
												var t = C(e);
												return [_(e), t, _(t)];
										  })(a)
										: [C(a)]));
							var h = [a].concat(r).reduce(function (e, a) {
								return e.concat(
									'auto' === y(a)
										? (function (e, t) {
												void 0 === t && (t = {});
												var a = t.boundary,
													i = t.rootBoundary,
													n = t.padding,
													r = t.flipVariations,
													s = t.allowedAutoPlacements,
													o = void 0 === s ? $ : s,
													l = t.placement.split('-')[1],
													d = (l
														? r
															? R
															: R.filter(function (e) {
																	return e.split('-')[1] === l;
															  })
														: z
													)
														.filter(function (e) {
															return 0 <= o.indexOf(e);
														})
														.reduce(function (t, r) {
															return (
																(t[r] = L(e, {
																	placement: r,
																	boundary: a,
																	rootBoundary: i,
																	padding: n,
																})[y(r)]),
																t
															);
														}, {});
												return Object.keys(d).sort(function (e, t) {
													return d[e] - d[t];
												});
										  })(t, {
												placement: a,
												boundary: o,
												rootBoundary: l,
												padding: s,
												flipVariations: u,
												allowedAutoPlacements: p,
										  })
										: a
								);
							}, []);
							(a = t.rects.reference), (r = t.rects.popper);
							var f = new Map();
							c = !0;
							for (var m = h[0], g = 0; g < h.length; g++) {
								var v = h[g],
									b = y(v),
									w = 'start' === v.split('-')[1],
									E = 0 <= ['top', 'bottom'].indexOf(b),
									x = E ? 'width' : 'height',
									S = L(t, {
										placement: v,
										boundary: o,
										rootBoundary: l,
										altBoundary: d,
										padding: s,
									});
								if (
									((w = E ? (w ? 'right' : 'left') : w ? 'bottom' : 'top'),
									a[x] > r[x] && (w = C(w)),
									(x = C(w)),
									(E = []),
									i && E.push(0 >= S[b]),
									n && E.push(0 >= S[w], 0 >= S[x]),
									E.every(function (e) {
										return e;
									}))
								) {
									(m = v), (c = !1);
									break;
								}
								f.set(v, E);
							}
							if (c)
								for (
									i = function (e) {
										var t = h.find(function (t) {
											if ((t = f.get(t)))
												return t.slice(0, e).every(function (e) {
													return e;
												});
										});
										if (t) return (m = t), 'break';
									},
										n = u ? 3 : 1;
									0 < n && 'break' !== i(n);
									n--
								);
							t.placement !== m &&
								((t.modifiersData[e]._skip = !0),
								(t.placement = m),
								(t.reset = !0));
						}
					},
					requiresIfExists: ['offset'],
					data: { _skip: !1 },
				},
				{
					name: 'preventOverflow',
					enabled: !0,
					phase: 'main',
					fn: function (e) {
						var t = e.state,
							a = e.options;
						e = e.name;
						var i = a.mainAxis,
							n = void 0 === i || i;
						i = void 0 !== (i = a.altAxis) && i;
						var r = a.tether;
						r = void 0 === r || r;
						var s = a.tetherOffset,
							o = void 0 === s ? 0 : s;
						(a = L(t, {
							boundary: a.boundary,
							rootBoundary: a.rootBoundary,
							padding: a.padding,
							altBoundary: a.altBoundary,
						})),
							(s = y(t.placement));
						var l = t.placement.split('-')[1],
							d = !l,
							c = x(s);
						s = 'x' === c ? 'y' : 'x';
						var u = t.modifiersData.popperOffsets,
							h = t.rects.reference,
							f = t.rects.popper,
							m =
								'function' == typeof o
									? o(Object.assign({}, t.rects, { placement: t.placement }))
									: o;
						if (((o = { x: 0, y: 0 }), u)) {
							if (n) {
								var v = 'y' === c ? 'top' : 'left',
									b = 'y' === c ? 'bottom' : 'right',
									w = 'y' === c ? 'height' : 'width';
								n = u[c];
								var E = u[c] + a[v],
									S = u[c] - a[b],
									T = r ? -f[w] / 2 : 0,
									C = 'start' === l ? h[w] : f[w];
								(l = 'start' === l ? -f[w] : -h[w]),
									(f = t.elements.arrow),
									(f = r && f ? p(f) : { width: 0, height: 0 });
								var _ = t.modifiersData['arrow#persistent']
									? t.modifiersData['arrow#persistent'].padding
									: { top: 0, right: 0, bottom: 0, left: 0 };
								(v = _[v]),
									(b = _[b]),
									(f = Math.max(0, Math.min(h[w], f[w]))),
									(C = d ? h[w] / 2 - T - f - v - m : C - f - v - m),
									(d = d ? -h[w] / 2 + T + f + b + m : l + f + b + m),
									(m = t.elements.arrow && g(t.elements.arrow)),
									(h = t.modifiersData.offset
										? t.modifiersData.offset[t.placement][c]
										: 0),
									(m =
										u[c] +
										C -
										h -
										(m
											? 'y' === c
												? m.clientTop || 0
												: m.clientLeft || 0
											: 0)),
									(d = u[c] + d - h),
									(r = Math.max(
										r ? Math.min(E, m) : E,
										Math.min(n, r ? Math.max(S, d) : S)
									)),
									(u[c] = r),
									(o[c] = r - n);
							}
							i &&
								((i = u[s]),
								(r = Math.max(
									i + a['x' === c ? 'top' : 'left'],
									Math.min(i, i - a['x' === c ? 'bottom' : 'right'])
								)),
								(u[s] = r),
								(o[s] = r - i)),
								(t.modifiersData[e] = o);
						}
					},
					requiresIfExists: ['offset'],
				},
				{
					name: 'arrow',
					enabled: !0,
					phase: 'main',
					fn: function (e) {
						var t,
							a = e.state;
						e = e.name;
						var i = a.elements.arrow,
							n = a.modifiersData.popperOffsets,
							r = y(a.placement),
							s = x(r);
						if (
							((r = 0 <= ['left', 'right'].indexOf(r) ? 'height' : 'width'),
							i && n)
						) {
							var o = a.modifiersData[e + '#persistent'].padding,
								l = p(i),
								d = 'y' === s ? 'top' : 'left',
								c = 'y' === s ? 'bottom' : 'right',
								u =
									a.rects.reference[r] +
									a.rects.reference[s] -
									n[s] -
									a.rects.popper[r];
							(n = n[s] - a.rects.reference[s]),
								(u =
									(i = (i = g(i))
										? 'y' === s
											? i.clientHeight || 0
											: i.clientWidth || 0
										: 0) /
										2 -
									l[r] / 2 +
									(u / 2 - n / 2)),
								(r = Math.max(o[d], Math.min(u, i - l[r] - o[c]))),
								(a.modifiersData[e] =
									(((t = {})[s] = r), (t.centerOffset = r - u), t));
						}
					},
					effect: function (e) {
						var t = e.state,
							a = e.options;
						e = e.name;
						var i = a.element;
						if (
							((i = void 0 === i ? '[data-popper-arrow]' : i),
							(a = void 0 === (a = a.padding) ? 0 : a),
							null != i)
						) {
							if (
								'string' == typeof i &&
								!(i = t.elements.popper.querySelector(i))
							)
								return;
							M(t.elements.popper, i) &&
								((t.elements.arrow = i),
								(t.modifiersData[e + '#persistent'] = {
									padding: P('number' != typeof a ? a : I(a, z)),
								}));
						}
					},
					requires: ['popperOffsets'],
					requiresIfExists: ['preventOverflow'],
				},
				{
					name: 'hide',
					enabled: !0,
					phase: 'main',
					requiresIfExists: ['preventOverflow'],
					fn: function (e) {
						var t = e.state;
						e = e.name;
						var a = t.rects.reference,
							i = t.rects.popper,
							n = t.modifiersData.preventOverflow,
							r = L(t, { elementContext: 'reference' }),
							s = L(t, { altBoundary: !0 });
						(a = A(r, a)),
							(i = A(s, i, n)),
							(n = D(a)),
							(s = D(i)),
							(t.modifiersData[e] = {
								referenceClippingOffsets: a,
								popperEscapeOffsets: i,
								isReferenceHidden: n,
								hasPopperEscaped: s,
							}),
							(t.attributes.popper = Object.assign({}, t.attributes.popper, {
								'data-popper-reference-hidden': n,
								'data-popper-escaped': s,
							}));
					},
				},
			],
			X = E({ defaultModifiers: U });
		(e.createPopper = X),
			(e.defaultModifiers = U),
			(e.detectOverflow = L),
			(e.popperGenerator = E),
			Object.defineProperty(e, '__esModule', { value: !0 });
	}),
	(function (e, t) {
		'function' == typeof define && define.amd
			? define([], function () {
					return t(e);
			  })
			: 'object' == typeof exports
			? (module.exports = t(e))
			: (e.SmoothScroll = t(e));
	})(
		'undefined' != typeof global
			? global
			: 'undefined' != typeof window
			? window
			: this,
		function (e) {
			var t = {
					ignore: '[data-scroll-ignore]',
					header: null,
					topOnEmptyHash: !0,
					speed: 500,
					speedAsDuration: !1,
					durationMax: null,
					durationMin: null,
					clip: !0,
					offset: 0,
					easing: 'easeInOutCubic',
					customEasing: null,
					updateURL: !0,
					popstate: !0,
					emitEvents: !0,
				},
				a = function () {
					var e = {};
					return (
						Array.prototype.forEach.call(arguments, function (t) {
							for (var a in t) {
								if (!t.hasOwnProperty(a)) return;
								e[a] = t[a];
							}
						}),
						e
					);
				},
				i = function (e) {
					'#' === e.charAt(0) && (e = e.substr(1));
					for (
						var t,
							a = String(e),
							i = a.length,
							n = -1,
							r = '',
							s = a.charCodeAt(0);
						++n < i;

					) {
						if (0 === (t = a.charCodeAt(n)))
							throw new InvalidCharacterError(
								'Invalid character: the input contains U+0000.'
							);
						r +=
							(1 <= t && t <= 31) ||
							127 == t ||
							(0 === n && 48 <= t && t <= 57) ||
							(1 === n && 48 <= t && t <= 57 && 45 === s)
								? '\\' + t.toString(16) + ' '
								: 128 <= t ||
								  45 === t ||
								  95 === t ||
								  (48 <= t && t <= 57) ||
								  (65 <= t && t <= 90) ||
								  (97 <= t && t <= 122)
								? a.charAt(n)
								: '\\' + a.charAt(n);
					}
					return '#' + r;
				},
				n = function () {
					return Math.max(
						document.body.scrollHeight,
						document.documentElement.scrollHeight,
						document.body.offsetHeight,
						document.documentElement.offsetHeight,
						document.body.clientHeight,
						document.documentElement.clientHeight
					);
				},
				r = function (t) {
					return t
						? ((a = t),
						  parseInt(e.getComputedStyle(a).height, 10) + t.offsetTop)
						: 0;
					var a;
				},
				s = function (t, a, i, n) {
					if (a.emitEvents && 'function' == typeof e.CustomEvent) {
						var r = new CustomEvent(t, {
							bubbles: !0,
							detail: { anchor: i, toggle: n },
						});
						document.dispatchEvent(r);
					}
				};
			return function (o, l) {
				var d,
					c,
					u,
					p,
					h = {
						cancelScroll: function (e) {
							cancelAnimationFrame(p), (p = null), e || s('scrollCancel', d);
						},
						animateScroll: function (i, o, l) {
							h.cancelScroll();
							var c = a(d || t, l || {}),
								f = '[object Number]' === Object.prototype.toString.call(i),
								m = f || !i.tagName ? null : i;
							if (f || m) {
								var g = e.pageYOffset;
								c.header && !u && (u = document.querySelector(c.header));
								var v,
									b,
									y,
									w,
									E,
									x,
									S,
									T,
									C = r(u),
									_ = f
										? i
										: (function (t, a, i, r) {
												var s = 0;
												if (t.offsetParent)
													for (; (s += t.offsetTop), (t = t.offsetParent); );
												return (
													(s = Math.max(s - a - i, 0)),
													r && (s = Math.min(s, n() - e.innerHeight)),
													s
												);
										  })(
												m,
												C,
												parseInt(
													'function' == typeof c.offset
														? c.offset(i, o)
														: c.offset,
													10
												),
												c.clip
										  ),
									M = _ - g,
									k = n(),
									O = 0,
									N =
										((v = M),
										(y = (b = c).speedAsDuration
											? b.speed
											: Math.abs((v / 1e3) * b.speed)),
										b.durationMax && y > b.durationMax
											? b.durationMax
											: b.durationMin && y < b.durationMin
											? b.durationMin
											: parseInt(y, 10)),
									P = function (t, a) {
										var n,
											r,
											l,
											d = e.pageYOffset;
										if (t == a || d == a || (g < a && e.innerHeight + d) >= k)
											return (
												h.cancelScroll(!0),
												(r = a),
												(l = f),
												0 === (n = i) && document.body.focus(),
												l ||
													(n.focus(),
													document.activeElement !== n &&
														(n.setAttribute('tabindex', '-1'),
														n.focus(),
														(n.style.outline = 'none')),
													e.scrollTo(0, r)),
												s('scrollStop', c, i, o),
												!(p = w = null)
											);
									},
									I = function (t) {
										var a, i, n;
										w || (w = t),
											(O += t - w),
											(x =
												g +
												M *
													((i = E = 1 < (E = 0 === N ? 0 : O / N) ? 1 : E),
													'easeInQuad' === (a = c).easing && (n = i * i),
													'easeOutQuad' === a.easing && (n = i * (2 - i)),
													'easeInOutQuad' === a.easing &&
														(n = i < 0.5 ? 2 * i * i : (4 - 2 * i) * i - 1),
													'easeInCubic' === a.easing && (n = i * i * i),
													'easeOutCubic' === a.easing && (n = --i * i * i + 1),
													'easeInOutCubic' === a.easing &&
														(n =
															i < 0.5
																? 4 * i * i * i
																: (i - 1) * (2 * i - 2) * (2 * i - 2) + 1),
													'easeInQuart' === a.easing && (n = i * i * i * i),
													'easeOutQuart' === a.easing &&
														(n = 1 - --i * i * i * i),
													'easeInOutQuart' === a.easing &&
														(n =
															i < 0.5
																? 8 * i * i * i * i
																: 1 - 8 * --i * i * i * i),
													'easeInQuint' === a.easing && (n = i * i * i * i * i),
													'easeOutQuint' === a.easing &&
														(n = 1 + --i * i * i * i * i),
													'easeInOutQuint' === a.easing &&
														(n =
															i < 0.5
																? 16 * i * i * i * i * i
																: 1 + 16 * --i * i * i * i * i),
													a.customEasing && (n = a.customEasing(i)),
													n || i)),
											e.scrollTo(0, Math.floor(x)),
											P(x, _) || ((p = e.requestAnimationFrame(I)), (w = t));
									};
								0 === e.pageYOffset && e.scrollTo(0, 0),
									(S = i),
									(T = c),
									f ||
										(history.pushState &&
											T.updateURL &&
											history.pushState(
												{ smoothScroll: JSON.stringify(T), anchor: S.id },
												document.title,
												S === document.documentElement ? '#top' : '#' + S.id
											)),
									'matchMedia' in e &&
									e.matchMedia('(prefers-reduced-motion)').matches
										? e.scrollTo(0, Math.floor(_))
										: (s('scrollStart', c, i, o),
										  h.cancelScroll(!0),
										  e.requestAnimationFrame(I));
							}
						},
					},
					f = function (t) {
						if (
							!t.defaultPrevented &&
							!(0 !== t.button || t.metaKey || t.ctrlKey || t.shiftKey) &&
							'closest' in t.target &&
							(c = t.target.closest(o)) &&
							'a' === c.tagName.toLowerCase() &&
							!t.target.closest(d.ignore) &&
							c.hostname === e.location.hostname &&
							c.pathname === e.location.pathname &&
							/#/.test(c.href)
						) {
							var a,
								n = i(c.hash);
							if ('#' === n) {
								if (!d.topOnEmptyHash) return;
								a = document.documentElement;
							} else a = document.querySelector(n);
							(a = a || '#top' !== n ? a : document.documentElement) &&
								(t.preventDefault(),
								(function (t) {
									if (history.replaceState && t.updateURL && !history.state) {
										var a = e.location.hash;
										(a = a || ''),
											history.replaceState(
												{
													smoothScroll: JSON.stringify(t),
													anchor: a || e.pageYOffset,
												},
												document.title,
												a || e.location.href
											);
									}
								})(d),
								h.animateScroll(a, c));
						}
					},
					m = function (e) {
						if (
							null !== history.state &&
							history.state.smoothScroll &&
							history.state.smoothScroll === JSON.stringify(d)
						) {
							var t = history.state.anchor;
							('string' == typeof t &&
								t &&
								!(t = document.querySelector(i(history.state.anchor)))) ||
								h.animateScroll(t, null, { updateURL: !1 });
						}
					};
				return (
					(h.destroy = function () {
						d &&
							(document.removeEventListener('click', f, !1),
							e.removeEventListener('popstate', m, !1),
							h.cancelScroll(),
							(p = u = c = d = null));
					}),
					(function () {
						if (
							!(
								'querySelector' in document &&
								'addEventListener' in e &&
								'requestAnimationFrame' in e &&
								'closest' in e.Element.prototype
							)
						)
							throw 'Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.';
						h.destroy(),
							(d = a(t, l || {})),
							(u = d.header ? document.querySelector(d.header) : null),
							document.addEventListener('click', f, !1),
							d.updateURL &&
								d.popstate &&
								e.addEventListener('popstate', m, !1);
					})(),
					h
				);
			};
		}
	),
	(function (e, t) {
		'object' == typeof exports && 'undefined' != typeof module
			? (module.exports = t())
			: 'function' == typeof define && define.amd
			? define(t)
			: ((e = e || self).Swiper = t());
	})(this, function () {
		function e(e, t) {
			var a = [],
				i = 0;
			if (e && !t && e instanceof s) return e;
			if (e)
				if ('string' == typeof e) {
					var o,
						l,
						d = e.trim();
					if (0 <= d.indexOf('<') && 0 <= d.indexOf('>')) {
						var c = 'div';
						for (
							0 === d.indexOf('<li') && (c = 'ul'),
								0 === d.indexOf('<tr') && (c = 'tbody'),
								(0 !== d.indexOf('<td') && 0 !== d.indexOf('<th')) ||
									(c = 'tr'),
								0 === d.indexOf('<tbody') && (c = 'table'),
								0 === d.indexOf('<option') && (c = 'select'),
								(l = n.createElement(c)).innerHTML = d,
								i = 0;
							i < l.childNodes.length;
							i += 1
						)
							a.push(l.childNodes[i]);
					} else
						for (
							o =
								t || '#' !== e[0] || e.match(/[ .<>:~]/)
									? (t || n).querySelectorAll(e.trim())
									: [n.getElementById(e.trim().split('#')[1])],
								i = 0;
							i < o.length;
							i += 1
						)
							o[i] && a.push(o[i]);
				} else if (e.nodeType || e === r || e === n) a.push(e);
				else if (0 < e.length && e[0].nodeType)
					for (i = 0; i < e.length; i += 1) a.push(e[i]);
			return new s(a);
		}
		function t(e) {
			for (var t = [], a = 0; a < e.length; a += 1)
				-1 === t.indexOf(e[a]) && t.push(e[a]);
			return t;
		}
		function a(e) {
			void 0 === e && (e = {});
			var t = this;
			(t.params = e),
				(t.eventsListeners = {}),
				t.params &&
					t.params.on &&
					Object.keys(t.params.on).forEach(function (e) {
						t.on(e, t.params.on[e]);
					});
		}
		function i() {
			var e = this,
				t = e.params,
				a = e.el;
			if (!a || 0 !== a.offsetWidth) {
				t.breakpoints && e.setBreakpoint();
				var i = e.allowSlideNext,
					n = e.allowSlidePrev,
					r = e.snapGrid;
				if (
					((e.allowSlideNext = !0),
					(e.allowSlidePrev = !0),
					e.updateSize(),
					e.updateSlides(),
					t.freeMode)
				) {
					var s = Math.min(
						Math.max(e.translate, e.maxTranslate()),
						e.minTranslate()
					);
					e.setTranslate(s),
						e.updateActiveIndex(),
						e.updateSlidesClasses(),
						t.autoHeight && e.updateAutoHeight();
				} else
					e.updateSlidesClasses(),
						('auto' === t.slidesPerView || 1 < t.slidesPerView) &&
						e.isEnd &&
						!e.params.centeredSlides
							? e.slideTo(e.slides.length - 1, 0, !1, !0)
							: e.slideTo(e.activeIndex, 0, !1, !0);
				e.autoplay &&
					e.autoplay.running &&
					e.autoplay.paused &&
					e.autoplay.run(),
					(e.allowSlidePrev = n),
					(e.allowSlideNext = i),
					e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
			}
		}
		var n =
				'undefined' == typeof document
					? {
							body: {},
							addEventListener: function () {},
							removeEventListener: function () {},
							activeElement: { blur: function () {}, nodeName: '' },
							querySelector: function () {
								return null;
							},
							querySelectorAll: function () {
								return [];
							},
							getElementById: function () {
								return null;
							},
							createEvent: function () {
								return { initEvent: function () {} };
							},
							createElement: function () {
								return {
									children: [],
									childNodes: [],
									style: {},
									setAttribute: function () {},
									getElementsByTagName: function () {
										return [];
									},
								};
							},
							location: { hash: '' },
					  }
					: document,
			r =
				'undefined' == typeof window
					? {
							document: n,
							navigator: { userAgent: '' },
							location: {},
							history: {},
							CustomEvent: function () {
								return this;
							},
							addEventListener: function () {},
							removeEventListener: function () {},
							getComputedStyle: function () {
								return {
									getPropertyValue: function () {
										return '';
									},
								};
							},
							Image: function () {},
							Date: function () {},
							screen: {},
							setTimeout: function () {},
							clearTimeout: function () {},
					  }
					: window,
			s = function (e) {
				for (var t = 0; t < e.length; t += 1) this[t] = e[t];
				return (this.length = e.length), this;
			};
		(e.fn = s.prototype), (e.Class = s), (e.Dom7 = s);
		var o = {
			addClass: function (e) {
				if (void 0 === e) return this;
				for (var t = e.split(' '), a = 0; a < t.length; a += 1)
					for (var i = 0; i < this.length; i += 1)
						void 0 !== this[i] &&
							void 0 !== this[i].classList &&
							this[i].classList.add(t[a]);
				return this;
			},
			removeClass: function (e) {
				for (var t = e.split(' '), a = 0; a < t.length; a += 1)
					for (var i = 0; i < this.length; i += 1)
						void 0 !== this[i] &&
							void 0 !== this[i].classList &&
							this[i].classList.remove(t[a]);
				return this;
			},
			hasClass: function (e) {
				return !!this[0] && this[0].classList.contains(e);
			},
			toggleClass: function (e) {
				for (var t = e.split(' '), a = 0; a < t.length; a += 1)
					for (var i = 0; i < this.length; i += 1)
						void 0 !== this[i] &&
							void 0 !== this[i].classList &&
							this[i].classList.toggle(t[a]);
				return this;
			},
			attr: function (e, t) {
				var a = arguments;
				if (1 === arguments.length && 'string' == typeof e)
					return this[0] ? this[0].getAttribute(e) : void 0;
				for (var i = 0; i < this.length; i += 1)
					if (2 === a.length) this[i].setAttribute(e, t);
					else
						for (var n in e) (this[i][n] = e[n]), this[i].setAttribute(n, e[n]);
				return this;
			},
			removeAttr: function (e) {
				for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
				return this;
			},
			data: function (e, t) {
				var a, i;
				if (void 0 !== t) {
					for (var n = 0; n < this.length; n += 1)
						(a = this[n]).dom7ElementDataStorage ||
							(a.dom7ElementDataStorage = {}),
							(a.dom7ElementDataStorage[e] = t);
					return this;
				}
				if ((a = this[0]))
					return a.dom7ElementDataStorage && e in a.dom7ElementDataStorage
						? a.dom7ElementDataStorage[e]
						: a.getAttribute('data-' + e) || void 0;
			},
			transform: function (e) {
				for (var t = 0; t < this.length; t += 1) {
					var a = this[t].style;
					(a.webkitTransform = e), (a.transform = e);
				}
				return this;
			},
			transition: function (e) {
				'string' != typeof e && (e += 'ms');
				for (var t = 0; t < this.length; t += 1) {
					var a = this[t].style;
					(a.webkitTransitionDuration = e), (a.transitionDuration = e);
				}
				return this;
			},
			on: function () {
				function t(t) {
					var a = t.target;
					if (a) {
						var i = t.target.dom7EventData || [];
						if ((i.indexOf(t) < 0 && i.unshift(t), e(a).is(o))) l.apply(a, i);
						else
							for (var n = e(a).parents(), r = 0; r < n.length; r += 1)
								e(n[r]).is(o) && l.apply(n[r], i);
					}
				}
				function a(e) {
					var t = (e && e.target && e.target.dom7EventData) || [];
					t.indexOf(e) < 0 && t.unshift(e), l.apply(this, t);
				}
				for (var i, n = [], r = arguments.length; r--; ) n[r] = arguments[r];
				var s = n[0],
					o = n[1],
					l = n[2],
					d = n[3];
				'function' == typeof n[1] &&
					((s = (i = n)[0]), (l = i[1]), (d = i[2]), (o = void 0)),
					(d = d || !1);
				for (var c, u = s.split(' '), p = 0; p < this.length; p += 1) {
					var h = this[p];
					if (o)
						for (c = 0; c < u.length; c += 1) {
							var f = u[c];
							h.dom7LiveListeners || (h.dom7LiveListeners = {}),
								h.dom7LiveListeners[f] || (h.dom7LiveListeners[f] = []),
								h.dom7LiveListeners[f].push({ listener: l, proxyListener: t }),
								h.addEventListener(f, t, d);
						}
					else
						for (c = 0; c < u.length; c += 1) {
							var m = u[c];
							h.dom7Listeners || (h.dom7Listeners = {}),
								h.dom7Listeners[m] || (h.dom7Listeners[m] = []),
								h.dom7Listeners[m].push({ listener: l, proxyListener: a }),
								h.addEventListener(m, a, d);
						}
				}
				return this;
			},
			off: function () {
				for (var e, t = [], a = arguments.length; a--; ) t[a] = arguments[a];
				var i = t[0],
					n = t[1],
					r = t[2],
					s = t[3];
				'function' == typeof t[1] &&
					((i = (e = t)[0]), (r = e[1]), (s = e[2]), (n = void 0)),
					(s = s || !1);
				for (var o = i.split(' '), l = 0; l < o.length; l += 1)
					for (var d = o[l], c = 0; c < this.length; c += 1) {
						var u = this[c],
							p = void 0;
						if (
							(!n && u.dom7Listeners
								? (p = u.dom7Listeners[d])
								: n && u.dom7LiveListeners && (p = u.dom7LiveListeners[d]),
							p && p.length)
						)
							for (var h = p.length - 1; 0 <= h; h -= 1) {
								var f = p[h];
								(r && f.listener === r) ||
								(r &&
									f.listener &&
									f.listener.dom7proxy &&
									f.listener.dom7proxy === r)
									? (u.removeEventListener(d, f.proxyListener, s),
									  p.splice(h, 1))
									: r ||
									  (u.removeEventListener(d, f.proxyListener, s),
									  p.splice(h, 1));
							}
					}
				return this;
			},
			trigger: function () {
				for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
				for (var a = e[0].split(' '), i = e[1], s = 0; s < a.length; s += 1)
					for (var o = a[s], l = 0; l < this.length; l += 1) {
						var d = this[l],
							c = void 0;
						try {
							c = new r.CustomEvent(o, {
								detail: i,
								bubbles: !0,
								cancelable: !0,
							});
						} catch (e) {
							(c = n.createEvent('Event')).initEvent(o, !0, !0), (c.detail = i);
						}
						(d.dom7EventData = e.filter(function (e, t) {
							return 0 < t;
						})),
							d.dispatchEvent(c),
							(d.dom7EventData = []),
							delete d.dom7EventData;
					}
				return this;
			},
			transitionEnd: function (e) {
				function t(r) {
					if (r.target === this)
						for (e.call(this, r), a = 0; a < i.length; a += 1) n.off(i[a], t);
				}
				var a,
					i = ['webkitTransitionEnd', 'transitionend'],
					n = this;
				if (e) for (a = 0; a < i.length; a += 1) n.on(i[a], t);
				return this;
			},
			outerWidth: function (e) {
				if (0 < this.length) {
					if (e) {
						var t = this.styles();
						return (
							this[0].offsetWidth +
							parseFloat(t.getPropertyValue('margin-right')) +
							parseFloat(t.getPropertyValue('margin-left'))
						);
					}
					return this[0].offsetWidth;
				}
				return null;
			},
			outerHeight: function (e) {
				if (0 < this.length) {
					if (e) {
						var t = this.styles();
						return (
							this[0].offsetHeight +
							parseFloat(t.getPropertyValue('margin-top')) +
							parseFloat(t.getPropertyValue('margin-bottom'))
						);
					}
					return this[0].offsetHeight;
				}
				return null;
			},
			offset: function () {
				if (0 < this.length) {
					var e = this[0],
						t = e.getBoundingClientRect(),
						a = n.body,
						i = e.clientTop || a.clientTop || 0,
						s = e.clientLeft || a.clientLeft || 0,
						o = e === r ? r.scrollY : e.scrollTop,
						l = e === r ? r.scrollX : e.scrollLeft;
					return { top: t.top + o - i, left: t.left + l - s };
				}
				return null;
			},
			css: function (e, t) {
				var a;
				if (1 === arguments.length) {
					if ('string' != typeof e) {
						for (a = 0; a < this.length; a += 1)
							for (var i in e) this[a].style[i] = e[i];
						return this;
					}
					if (this[0])
						return r.getComputedStyle(this[0], null).getPropertyValue(e);
				}
				if (2 !== arguments.length || 'string' != typeof e) return this;
				for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
				return this;
			},
			each: function (e) {
				if (!e) return this;
				for (var t = 0; t < this.length; t += 1)
					if (!1 === e.call(this[t], t, this[t])) return this;
				return this;
			},
			html: function (e) {
				if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
				for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
				return this;
			},
			text: function (e) {
				if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
				for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
				return this;
			},
			is: function (t) {
				var a,
					i,
					o = this[0];
				if (!o || void 0 === t) return !1;
				if ('string' == typeof t) {
					if (o.matches) return o.matches(t);
					if (o.webkitMatchesSelector) return o.webkitMatchesSelector(t);
					if (o.msMatchesSelector) return o.msMatchesSelector(t);
					for (a = e(t), i = 0; i < a.length; i += 1) if (a[i] === o) return !0;
					return !1;
				}
				if (t === n) return o === n;
				if (t === r) return o === r;
				if (t.nodeType || t instanceof s) {
					for (a = t.nodeType ? [t] : t, i = 0; i < a.length; i += 1)
						if (a[i] === o) return !0;
					return !1;
				}
				return !1;
			},
			index: function () {
				var e,
					t = this[0];
				if (t) {
					for (e = 0; null !== (t = t.previousSibling); )
						1 === t.nodeType && (e += 1);
					return e;
				}
			},
			eq: function (e) {
				if (void 0 === e) return this;
				var t,
					a = this.length;
				return new s(
					a - 1 < e
						? []
						: e < 0
						? (t = a + e) < 0
							? []
							: [this[t]]
						: [this[e]]
				);
			},
			append: function () {
				for (var e, t = [], a = arguments.length; a--; ) t[a] = arguments[a];
				for (var i = 0; i < t.length; i += 1) {
					e = t[i];
					for (var r = 0; r < this.length; r += 1)
						if ('string' == typeof e) {
							var o = n.createElement('div');
							for (o.innerHTML = e; o.firstChild; )
								this[r].appendChild(o.firstChild);
						} else if (e instanceof s)
							for (var l = 0; l < e.length; l += 1) this[r].appendChild(e[l]);
						else this[r].appendChild(e);
				}
				return this;
			},
			prepend: function (e) {
				var t, a;
				for (t = 0; t < this.length; t += 1)
					if ('string' == typeof e) {
						var i = n.createElement('div');
						for (i.innerHTML = e, a = i.childNodes.length - 1; 0 <= a; a -= 1)
							this[t].insertBefore(i.childNodes[a], this[t].childNodes[0]);
					} else if (e instanceof s)
						for (a = 0; a < e.length; a += 1)
							this[t].insertBefore(e[a], this[t].childNodes[0]);
					else this[t].insertBefore(e, this[t].childNodes[0]);
				return this;
			},
			next: function (t) {
				return 0 < this.length
					? t
						? this[0].nextElementSibling && e(this[0].nextElementSibling).is(t)
							? new s([this[0].nextElementSibling])
							: new s([])
						: this[0].nextElementSibling
						? new s([this[0].nextElementSibling])
						: new s([])
					: new s([]);
			},
			nextAll: function (t) {
				var a = [],
					i = this[0];
				if (!i) return new s([]);
				for (; i.nextElementSibling; ) {
					var n = i.nextElementSibling;
					t ? e(n).is(t) && a.push(n) : a.push(n), (i = n);
				}
				return new s(a);
			},
			prev: function (t) {
				if (0 < this.length) {
					var a = this[0];
					return t
						? a.previousElementSibling && e(a.previousElementSibling).is(t)
							? new s([a.previousElementSibling])
							: new s([])
						: a.previousElementSibling
						? new s([a.previousElementSibling])
						: new s([]);
				}
				return new s([]);
			},
			prevAll: function (t) {
				var a = [],
					i = this[0];
				if (!i) return new s([]);
				for (; i.previousElementSibling; ) {
					var n = i.previousElementSibling;
					t ? e(n).is(t) && a.push(n) : a.push(n), (i = n);
				}
				return new s(a);
			},
			parent: function (a) {
				for (var i = [], n = 0; n < this.length; n += 1)
					null !== this[n].parentNode &&
						(a
							? e(this[n].parentNode).is(a) && i.push(this[n].parentNode)
							: i.push(this[n].parentNode));
				return e(t(i));
			},
			parents: function (a) {
				for (var i = [], n = 0; n < this.length; n += 1)
					for (var r = this[n].parentNode; r; )
						a ? e(r).is(a) && i.push(r) : i.push(r), (r = r.parentNode);
				return e(t(i));
			},
			closest: function (e) {
				var t = this;
				return void 0 === e
					? new s([])
					: (t.is(e) || (t = t.parents(e).eq(0)), t);
			},
			find: function (e) {
				for (var t = [], a = 0; a < this.length; a += 1)
					for (var i = this[a].querySelectorAll(e), n = 0; n < i.length; n += 1)
						t.push(i[n]);
				return new s(t);
			},
			children: function (a) {
				for (var i = [], n = 0; n < this.length; n += 1)
					for (var r = this[n].childNodes, o = 0; o < r.length; o += 1)
						a
							? 1 === r[o].nodeType && e(r[o]).is(a) && i.push(r[o])
							: 1 === r[o].nodeType && i.push(r[o]);
				return new s(t(i));
			},
			remove: function () {
				for (var e = 0; e < this.length; e += 1)
					this[e].parentNode && this[e].parentNode.removeChild(this[e]);
				return this;
			},
			add: function () {
				for (var t = [], a = arguments.length; a--; ) t[a] = arguments[a];
				var i, n;
				for (i = 0; i < t.length; i += 1) {
					var r = e(t[i]);
					for (n = 0; n < r.length; n += 1)
						(this[this.length] = r[n]), (this.length += 1);
				}
				return this;
			},
			styles: function () {
				return this[0] ? r.getComputedStyle(this[0], null) : {};
			},
		};
		Object.keys(o).forEach(function (t) {
			e.fn[t] = e.fn[t] || o[t];
		});
		var l,
			d,
			c,
			u,
			p = {
				deleteProps: function (e) {
					var t = e;
					Object.keys(t).forEach(function (e) {
						try {
							t[e] = null;
						} catch (e) {}
						try {
							delete t[e];
						} catch (e) {}
					});
				},
				nextTick: function (e, t) {
					return void 0 === t && (t = 0), setTimeout(e, t);
				},
				now: function () {
					return Date.now();
				},
				getTranslate: function (e, t) {
					var a, i, n;
					void 0 === t && (t = 'x');
					var s = r.getComputedStyle(e, null);
					return (
						r.WebKitCSSMatrix
							? (6 < (i = s.transform || s.webkitTransform).split(',').length &&
									(i = i
										.split(', ')
										.map(function (e) {
											return e.replace(',', '.');
										})
										.join(', ')),
							  (n = new r.WebKitCSSMatrix('none' === i ? '' : i)))
							: (a = (n =
									s.MozTransform ||
									s.OTransform ||
									s.MsTransform ||
									s.msTransform ||
									s.transform ||
									s
										.getPropertyValue('transform')
										.replace('translate(', 'matrix(1, 0, 0, 1,'))
									.toString()
									.split(',')),
						'x' === t &&
							(i = r.WebKitCSSMatrix
								? n.m41
								: 16 === a.length
								? parseFloat(a[12])
								: parseFloat(a[4])),
						'y' === t &&
							(i = r.WebKitCSSMatrix
								? n.m42
								: 16 === a.length
								? parseFloat(a[13])
								: parseFloat(a[5])),
						i || 0
					);
				},
				parseUrlQuery: function (e) {
					var t,
						a,
						i,
						n,
						s = {},
						o = e || r.location.href;
					if ('string' == typeof o && o.length)
						for (
							n = (a = (o = -1 < o.indexOf('?') ? o.replace(/\S*\?/, '') : '')
								.split('&')
								.filter(function (e) {
									return '' !== e;
								})).length,
								t = 0;
							t < n;
							t += 1
						)
							(i = a[t].replace(/#\S+/g, '').split('=')),
								(s[decodeURIComponent(i[0])] =
									void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || '');
					return s;
				},
				isObject: function (e) {
					return (
						'object' == typeof e &&
						null !== e &&
						e.constructor &&
						e.constructor === Object
					);
				},
				extend: function () {
					for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
					for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
						var n = e[i];
						if (null != n)
							for (
								var r = Object.keys(Object(n)), s = 0, o = r.length;
								s < o;
								s += 1
							) {
								var l = r[s],
									d = Object.getOwnPropertyDescriptor(n, l);
								void 0 !== d &&
									d.enumerable &&
									(p.isObject(a[l]) && p.isObject(n[l])
										? p.extend(a[l], n[l])
										: !p.isObject(a[l]) && p.isObject(n[l])
										? ((a[l] = {}), p.extend(a[l], n[l]))
										: (a[l] = n[l]));
							}
					}
					return a;
				},
			},
			h =
				((c = n.createElement('div')),
				{
					touch:
						(r.Modernizr && !0 === r.Modernizr.touch) ||
						!!(
							0 < r.navigator.maxTouchPoints ||
							'ontouchstart' in r ||
							(r.DocumentTouch && n instanceof r.DocumentTouch)
						),
					pointerEvents: !!(
						r.navigator.pointerEnabled ||
						r.PointerEvent ||
						('maxTouchPoints' in r.navigator && 0 < r.navigator.maxTouchPoints)
					),
					prefixedPointerEvents: !!r.navigator.msPointerEnabled,
					transition:
						((d = c.style),
						'transition' in d ||
							'webkitTransition' in d ||
							'MozTransition' in d),
					transforms3d:
						(r.Modernizr && !0 === r.Modernizr.csstransforms3d) ||
						((l = c.style),
						'webkitPerspective' in l ||
							'MozPerspective' in l ||
							'OPerspective' in l ||
							'MsPerspective' in l ||
							'perspective' in l),
					flexbox: (function () {
						for (
							var e = c.style,
								t = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(
									' '
								),
								a = 0;
							a < t.length;
							a += 1
						)
							if (t[a] in e) return !0;
						return !1;
					})(),
					observer: 'MutationObserver' in r || 'WebkitMutationObserver' in r,
					passiveListener: (function () {
						var e = !1;
						try {
							var t = Object.defineProperty({}, 'passive', {
								get: function () {
									e = !0;
								},
							});
							r.addEventListener('testPassiveListener', null, t);
						} catch (e) {}
						return e;
					})(),
					gestures: 'ongesturestart' in r,
				}),
			f = {
				isIE:
					!!r.navigator.userAgent.match(/Trident/g) ||
					!!r.navigator.userAgent.match(/MSIE/g),
				isEdge: !!r.navigator.userAgent.match(/Edge/g),
				isSafari:
					((u = r.navigator.userAgent.toLowerCase()),
					0 <= u.indexOf('safari') &&
						u.indexOf('chrome') < 0 &&
						u.indexOf('android') < 0),
				isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
					r.navigator.userAgent
				),
			},
			m = { components: { configurable: !0 } };
		(a.prototype.on = function (e, t, a) {
			var i = this;
			if ('function' != typeof t) return i;
			var n = a ? 'unshift' : 'push';
			return (
				e.split(' ').forEach(function (e) {
					i.eventsListeners[e] || (i.eventsListeners[e] = []),
						i.eventsListeners[e][n](t);
				}),
				i
			);
		}),
			(a.prototype.once = function (e, t, a) {
				function i() {
					for (var a = [], r = arguments.length; r--; ) a[r] = arguments[r];
					t.apply(n, a), n.off(e, i), i.f7proxy && delete i.f7proxy;
				}
				var n = this;
				return 'function' != typeof t ? n : ((i.f7proxy = t), n.on(e, i, a));
			}),
			(a.prototype.off = function (e, t) {
				var a = this;
				return (
					a.eventsListeners &&
						e.split(' ').forEach(function (e) {
							void 0 === t
								? (a.eventsListeners[e] = [])
								: a.eventsListeners[e] &&
								  a.eventsListeners[e].length &&
								  a.eventsListeners[e].forEach(function (i, n) {
										(i === t || (i.f7proxy && i.f7proxy === t)) &&
											a.eventsListeners[e].splice(n, 1);
								  });
						}),
					a
				);
			}),
			(a.prototype.emit = function () {
				for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
				var a,
					i,
					n,
					r = this;
				return (
					r.eventsListeners &&
						((n =
							'string' == typeof e[0] || Array.isArray(e[0])
								? ((a = e[0]), (i = e.slice(1, e.length)), r)
								: ((a = e[0].events), (i = e[0].data), e[0].context || r)),
						(Array.isArray(a) ? a : a.split(' ')).forEach(function (e) {
							if (r.eventsListeners && r.eventsListeners[e]) {
								var t = [];
								r.eventsListeners[e].forEach(function (e) {
									t.push(e);
								}),
									t.forEach(function (e) {
										e.apply(n, i);
									});
							}
						})),
					r
				);
			}),
			(a.prototype.useModulesParams = function (e) {
				var t = this;
				t.modules &&
					Object.keys(t.modules).forEach(function (a) {
						var i = t.modules[a];
						i.params && p.extend(e, i.params);
					});
			}),
			(a.prototype.useModules = function (e) {
				void 0 === e && (e = {});
				var t = this;
				t.modules &&
					Object.keys(t.modules).forEach(function (a) {
						var i = t.modules[a],
							n = e[a] || {};
						i.instance &&
							Object.keys(i.instance).forEach(function (e) {
								var a = i.instance[e];
								t[e] = 'function' == typeof a ? a.bind(t) : a;
							}),
							i.on &&
								t.on &&
								Object.keys(i.on).forEach(function (e) {
									t.on(e, i.on[e]);
								}),
							i.create && i.create.bind(t)(n);
					});
			}),
			(m.components.set = function (e) {
				this.use && this.use(e);
			}),
			(a.installModule = function (e) {
				for (var t = [], a = arguments.length - 1; 0 < a--; )
					t[a] = arguments[a + 1];
				var i = this;
				i.prototype.modules || (i.prototype.modules = {});
				var n =
					e.name || Object.keys(i.prototype.modules).length + '_' + p.now();
				return (
					(i.prototype.modules[n] = e).proto &&
						Object.keys(e.proto).forEach(function (t) {
							i.prototype[t] = e.proto[t];
						}),
					e.static &&
						Object.keys(e.static).forEach(function (t) {
							i[t] = e.static[t];
						}),
					e.install && e.install.apply(i, t),
					i
				);
			}),
			(a.use = function (e) {
				for (var t = [], a = arguments.length - 1; 0 < a--; )
					t[a] = arguments[a + 1];
				var i = this;
				return Array.isArray(e)
					? (e.forEach(function (e) {
							return i.installModule(e);
					  }),
					  i)
					: i.installModule.apply(i, [e].concat(t));
			}),
			Object.defineProperties(a, m);
		var g = {
				updateSize: function () {
					var e,
						t,
						a = this,
						i = a.$el;
					(e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth),
						(t =
							void 0 !== a.params.height ? a.params.height : i[0].clientHeight),
						(0 === e && a.isHorizontal()) ||
							(0 === t && a.isVertical()) ||
							((e =
								e -
								parseInt(i.css('padding-left'), 10) -
								parseInt(i.css('padding-right'), 10)),
							(t =
								t -
								parseInt(i.css('padding-top'), 10) -
								parseInt(i.css('padding-bottom'), 10)),
							p.extend(a, {
								width: e,
								height: t,
								size: a.isHorizontal() ? e : t,
							}));
				},
				updateSlides: function () {
					var e = this,
						t = e.params,
						a = e.$wrapperEl,
						i = e.size,
						n = e.rtlTranslate,
						s = e.wrongRTL,
						o = e.virtual && t.virtual.enabled,
						l = o ? e.virtual.slides.length : e.slides.length,
						d = a.children('.' + e.params.slideClass),
						c = o ? e.virtual.slides.length : d.length,
						u = [],
						m = [],
						g = [],
						v = t.slidesOffsetBefore;
					'function' == typeof v && (v = t.slidesOffsetBefore.call(e));
					var b = t.slidesOffsetAfter;
					'function' == typeof b && (b = t.slidesOffsetAfter.call(e));
					var y = e.snapGrid.length,
						w = e.snapGrid.length,
						E = t.spaceBetween,
						x = -v,
						S = 0,
						T = 0;
					if (void 0 !== i) {
						var C, _;
						'string' == typeof E &&
							0 <= E.indexOf('%') &&
							(E = (parseFloat(E.replace('%', '')) / 100) * i),
							(e.virtualSize = -E),
							n
								? d.css({ marginLeft: '', marginTop: '' })
								: d.css({ marginRight: '', marginBottom: '' }),
							1 < t.slidesPerColumn &&
								((C =
									Math.floor(c / t.slidesPerColumn) ===
									c / e.params.slidesPerColumn
										? c
										: Math.ceil(c / t.slidesPerColumn) * t.slidesPerColumn),
								'auto' !== t.slidesPerView &&
									'row' === t.slidesPerColumnFill &&
									(C = Math.max(C, t.slidesPerView * t.slidesPerColumn)));
						for (
							var M,
								k = t.slidesPerColumn,
								O = C / k,
								N = Math.floor(c / t.slidesPerColumn),
								P = 0;
							P < c;
							P += 1
						) {
							_ = 0;
							var I = d.eq(P);
							if (1 < t.slidesPerColumn) {
								var L = void 0,
									A = void 0,
									D = void 0;
								if (
									'column' === t.slidesPerColumnFill ||
									('row' === t.slidesPerColumnFill && 1 < t.slidesPerGroup)
								) {
									if ('column' === t.slidesPerColumnFill)
										(D = P - (A = Math.floor(P / k)) * k),
											(N < A || (A === N && D === k - 1)) &&
												k <= (D += 1) &&
												((D = 0), (A += 1));
									else {
										var z = Math.floor(P / t.slidesPerGroup);
										A =
											P -
											(D =
												Math.floor(P / t.slidesPerView) -
												z * t.slidesPerColumn) *
												t.slidesPerView -
											z * t.slidesPerView;
									}
									(L = A + (D * C) / k),
										I.css({
											'-webkit-box-ordinal-group': L,
											'-moz-box-ordinal-group': L,
											'-ms-flex-order': L,
											'-webkit-order': L,
											'order': L,
										});
								} else A = P - (D = Math.floor(P / O)) * O;
								I.css(
									'margin-' + (e.isHorizontal() ? 'top' : 'left'),
									0 !== D && t.spaceBetween && t.spaceBetween + 'px'
								)
									.attr('data-swiper-column', A)
									.attr('data-swiper-row', D);
							}
							if ('none' !== I.css('display')) {
								if ('auto' === t.slidesPerView) {
									var R = r.getComputedStyle(I[0], null),
										$ = I[0].style.transform,
										B = I[0].style.webkitTransform;
									if (
										($ && (I[0].style.transform = 'none'),
										B && (I[0].style.webkitTransform = 'none'),
										t.roundLengths)
									)
										_ = e.isHorizontal() ? I.outerWidth(!0) : I.outerHeight(!0);
									else if (e.isHorizontal()) {
										var H = parseFloat(R.getPropertyValue('width')),
											j = parseFloat(R.getPropertyValue('padding-left')),
											G = parseFloat(R.getPropertyValue('padding-right')),
											q = parseFloat(R.getPropertyValue('margin-left')),
											F = parseFloat(R.getPropertyValue('margin-right')),
											U = R.getPropertyValue('box-sizing');
										_ =
											U && 'border-box' === U && !f.isIE
												? H + q + F
												: H + j + G + q + F;
									} else {
										var X = parseFloat(R.getPropertyValue('height')),
											V = parseFloat(R.getPropertyValue('padding-top')),
											Y = parseFloat(R.getPropertyValue('padding-bottom')),
											W = parseFloat(R.getPropertyValue('margin-top')),
											K = parseFloat(R.getPropertyValue('margin-bottom')),
											Z = R.getPropertyValue('box-sizing');
										_ =
											Z && 'border-box' === Z && !f.isIE
												? X + W + K
												: X + V + Y + W + K;
									}
									$ && (I[0].style.transform = $),
										B && (I[0].style.webkitTransform = B),
										t.roundLengths && (_ = Math.floor(_));
								} else
									(_ = (i - (t.slidesPerView - 1) * E) / t.slidesPerView),
										t.roundLengths && (_ = Math.floor(_)),
										d[P] &&
											(e.isHorizontal()
												? (d[P].style.width = _ + 'px')
												: (d[P].style.height = _ + 'px'));
								d[P] && (d[P].swiperSlideSize = _),
									g.push(_),
									t.centeredSlides
										? ((x = x + _ / 2 + S / 2 + E),
										  0 === S && 0 !== P && (x = x - i / 2 - E),
										  0 === P && (x = x - i / 2 - E),
										  Math.abs(x) < 0.001 && (x = 0),
										  t.roundLengths && (x = Math.floor(x)),
										  T % t.slidesPerGroup == 0 && u.push(x),
										  m.push(x))
										: (t.roundLengths && (x = Math.floor(x)),
										  T % t.slidesPerGroup == 0 && u.push(x),
										  m.push(x),
										  (x = x + _ + E)),
									(e.virtualSize += _ + E),
									(S = _),
									(T += 1);
							}
						}
						if (
							((e.virtualSize = Math.max(e.virtualSize, i) + b),
							n &&
								s &&
								('slide' === t.effect || 'coverflow' === t.effect) &&
								a.css({ width: e.virtualSize + t.spaceBetween + 'px' }),
							(h.flexbox && !t.setWrapperSize) ||
								(e.isHorizontal()
									? a.css({ width: e.virtualSize + t.spaceBetween + 'px' })
									: a.css({ height: e.virtualSize + t.spaceBetween + 'px' })),
							1 < t.slidesPerColumn &&
								((e.virtualSize = (_ + t.spaceBetween) * C),
								(e.virtualSize =
									Math.ceil(e.virtualSize / t.slidesPerColumn) -
									t.spaceBetween),
								e.isHorizontal()
									? a.css({ width: e.virtualSize + t.spaceBetween + 'px' })
									: a.css({ height: e.virtualSize + t.spaceBetween + 'px' }),
								t.centeredSlides))
						) {
							M = [];
							for (var Q = 0; Q < u.length; Q += 1) {
								var J = u[Q];
								t.roundLengths && (J = Math.floor(J)),
									u[Q] < e.virtualSize + u[0] && M.push(J);
							}
							u = M;
						}
						if (!t.centeredSlides) {
							M = [];
							for (var ee = 0; ee < u.length; ee += 1) {
								var te = u[ee];
								t.roundLengths && (te = Math.floor(te)),
									u[ee] <= e.virtualSize - i && M.push(te);
							}
							(u = M),
								1 <
									Math.floor(e.virtualSize - i) - Math.floor(u[u.length - 1]) &&
									u.push(e.virtualSize - i);
						}
						if (
							(0 === u.length && (u = [0]),
							0 !== t.spaceBetween &&
								(e.isHorizontal()
									? n
										? d.css({ marginLeft: E + 'px' })
										: d.css({ marginRight: E + 'px' })
									: d.css({ marginBottom: E + 'px' })),
							t.centerInsufficientSlides)
						) {
							var ae = 0;
							if (
								(g.forEach(function (e) {
									ae += e + (t.spaceBetween ? t.spaceBetween : 0);
								}),
								(ae -= t.spaceBetween) < i)
							) {
								var ie = (i - ae) / 2;
								u.forEach(function (e, t) {
									u[t] = e - ie;
								}),
									m.forEach(function (e, t) {
										m[t] = e + ie;
									});
							}
						}
						p.extend(e, {
							slides: d,
							snapGrid: u,
							slidesGrid: m,
							slidesSizesGrid: g,
						}),
							c !== l && e.emit('slidesLengthChange'),
							u.length !== y &&
								(e.params.watchOverflow && e.checkOverflow(),
								e.emit('snapGridLengthChange')),
							m.length !== w && e.emit('slidesGridLengthChange'),
							(t.watchSlidesProgress || t.watchSlidesVisibility) &&
								e.updateSlidesOffset();
					}
				},
				updateAutoHeight: function (e) {
					var t,
						a = this,
						i = [],
						n = 0;
					if (
						('number' == typeof e
							? a.setTransition(e)
							: !0 === e && a.setTransition(a.params.speed),
						'auto' !== a.params.slidesPerView && 1 < a.params.slidesPerView)
					)
						for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
							var r = a.activeIndex + t;
							if (r > a.slides.length) break;
							i.push(a.slides.eq(r)[0]);
						}
					else i.push(a.slides.eq(a.activeIndex)[0]);
					for (t = 0; t < i.length; t += 1)
						if (void 0 !== i[t]) {
							var s = i[t].offsetHeight;
							n = n < s ? s : n;
						}
					n && a.$wrapperEl.css('height', n + 'px');
				},
				updateSlidesOffset: function () {
					for (var e = this.slides, t = 0; t < e.length; t += 1)
						e[t].swiperSlideOffset = this.isHorizontal()
							? e[t].offsetLeft
							: e[t].offsetTop;
				},
				updateSlidesProgress: function (t) {
					void 0 === t && (t = (this && this.translate) || 0);
					var a = this,
						i = a.params,
						n = a.slides,
						r = a.rtlTranslate;
					if (0 !== n.length) {
						void 0 === n[0].swiperSlideOffset && a.updateSlidesOffset();
						var s = -t;
						r && (s = t),
							n.removeClass(i.slideVisibleClass),
							(a.visibleSlidesIndexes = []),
							(a.visibleSlides = []);
						for (var o = 0; o < n.length; o += 1) {
							var l = n[o],
								d =
									(s +
										(i.centeredSlides ? a.minTranslate() : 0) -
										l.swiperSlideOffset) /
									(l.swiperSlideSize + i.spaceBetween);
							if (i.watchSlidesVisibility) {
								var c = -(s - l.swiperSlideOffset),
									u = c + a.slidesSizesGrid[o];
								((0 <= c && c < a.size - 1) ||
									(1 < u && u <= a.size) ||
									(c <= 0 && u >= a.size)) &&
									(a.visibleSlides.push(l),
									a.visibleSlidesIndexes.push(o),
									n.eq(o).addClass(i.slideVisibleClass));
							}
							l.progress = r ? -d : d;
						}
						a.visibleSlides = e(a.visibleSlides);
					}
				},
				updateProgress: function (e) {
					void 0 === e && (e = (this && this.translate) || 0);
					var t = this,
						a = t.params,
						i = t.maxTranslate() - t.minTranslate(),
						n = t.progress,
						r = t.isBeginning,
						s = t.isEnd,
						o = r,
						l = s;
					(s =
						0 == i
							? (r = !(n = 0))
							: ((r = (n = (e - t.minTranslate()) / i) <= 0), 1 <= n)),
						p.extend(t, { progress: n, isBeginning: r, isEnd: s }),
						(a.watchSlidesProgress || a.watchSlidesVisibility) &&
							t.updateSlidesProgress(e),
						r && !o && t.emit('reachBeginning toEdge'),
						s && !l && t.emit('reachEnd toEdge'),
						((o && !r) || (l && !s)) && t.emit('fromEdge'),
						t.emit('progress', n);
				},
				updateSlidesClasses: function () {
					var e,
						t = this,
						a = t.slides,
						i = t.params,
						n = t.$wrapperEl,
						r = t.activeIndex,
						s = t.realIndex,
						o = t.virtual && i.virtual.enabled;
					a.removeClass(
						i.slideActiveClass +
							' ' +
							i.slideNextClass +
							' ' +
							i.slidePrevClass +
							' ' +
							i.slideDuplicateActiveClass +
							' ' +
							i.slideDuplicateNextClass +
							' ' +
							i.slideDuplicatePrevClass
					),
						(e = o
							? t.$wrapperEl.find(
									'.' + i.slideClass + '[data-swiper-slide-index="' + r + '"]'
							  )
							: a.eq(r)).addClass(i.slideActiveClass),
						i.loop &&
							(e.hasClass(i.slideDuplicateClass)
								? n
										.children(
											'.' +
												i.slideClass +
												':not(.' +
												i.slideDuplicateClass +
												')[data-swiper-slide-index="' +
												s +
												'"]'
										)
										.addClass(i.slideDuplicateActiveClass)
								: n
										.children(
											'.' +
												i.slideClass +
												'.' +
												i.slideDuplicateClass +
												'[data-swiper-slide-index="' +
												s +
												'"]'
										)
										.addClass(i.slideDuplicateActiveClass));
					var l = e
						.nextAll('.' + i.slideClass)
						.eq(0)
						.addClass(i.slideNextClass);
					i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
					var d = e
						.prevAll('.' + i.slideClass)
						.eq(0)
						.addClass(i.slidePrevClass);
					i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass),
						i.loop &&
							(l.hasClass(i.slideDuplicateClass)
								? n
										.children(
											'.' +
												i.slideClass +
												':not(.' +
												i.slideDuplicateClass +
												')[data-swiper-slide-index="' +
												l.attr('data-swiper-slide-index') +
												'"]'
										)
										.addClass(i.slideDuplicateNextClass)
								: n
										.children(
											'.' +
												i.slideClass +
												'.' +
												i.slideDuplicateClass +
												'[data-swiper-slide-index="' +
												l.attr('data-swiper-slide-index') +
												'"]'
										)
										.addClass(i.slideDuplicateNextClass),
							d.hasClass(i.slideDuplicateClass)
								? n
										.children(
											'.' +
												i.slideClass +
												':not(.' +
												i.slideDuplicateClass +
												')[data-swiper-slide-index="' +
												d.attr('data-swiper-slide-index') +
												'"]'
										)
										.addClass(i.slideDuplicatePrevClass)
								: n
										.children(
											'.' +
												i.slideClass +
												'.' +
												i.slideDuplicateClass +
												'[data-swiper-slide-index="' +
												d.attr('data-swiper-slide-index') +
												'"]'
										)
										.addClass(i.slideDuplicatePrevClass));
				},
				updateActiveIndex: function (e) {
					var t,
						a = this,
						i = a.rtlTranslate ? a.translate : -a.translate,
						n = a.slidesGrid,
						r = a.snapGrid,
						s = a.params,
						o = a.activeIndex,
						l = a.realIndex,
						d = a.snapIndex,
						c = e;
					if (void 0 === c) {
						for (var u = 0; u < n.length; u += 1)
							void 0 !== n[u + 1]
								? i >= n[u] && i < n[u + 1] - (n[u + 1] - n[u]) / 2
									? (c = u)
									: i >= n[u] && i < n[u + 1] && (c = u + 1)
								: i >= n[u] && (c = u);
						s.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
					}
					if (
						((t =
							0 <= r.indexOf(i)
								? r.indexOf(i)
								: Math.floor(c / s.slidesPerGroup)) >= r.length &&
							(t = r.length - 1),
						c !== o)
					) {
						var h = parseInt(
							a.slides.eq(c).attr('data-swiper-slide-index') || c,
							10
						);
						p.extend(a, {
							snapIndex: t,
							realIndex: h,
							previousIndex: o,
							activeIndex: c,
						}),
							a.emit('activeIndexChange'),
							a.emit('snapIndexChange'),
							l !== h && a.emit('realIndexChange'),
							(a.initialized || a.runCallbacksOnInit) && a.emit('slideChange');
					} else t !== d && ((a.snapIndex = t), a.emit('snapIndexChange'));
				},
				updateClickedSlide: function (t) {
					var a = this,
						i = a.params,
						n = e(t.target).closest('.' + i.slideClass)[0],
						r = !1;
					if (n)
						for (var s = 0; s < a.slides.length; s += 1)
							a.slides[s] === n && (r = !0);
					if (!n || !r)
						return (a.clickedSlide = void 0), void (a.clickedIndex = void 0);
					(a.clickedSlide = n),
						a.virtual && a.params.virtual.enabled
							? (a.clickedIndex = parseInt(
									e(n).attr('data-swiper-slide-index'),
									10
							  ))
							: (a.clickedIndex = e(n).index()),
						i.slideToClickedSlide &&
							void 0 !== a.clickedIndex &&
							a.clickedIndex !== a.activeIndex &&
							a.slideToClickedSlide();
				},
			},
			v = {
				getTranslate: function (e) {
					void 0 === e && (e = this.isHorizontal() ? 'x' : 'y');
					var t = this.params,
						a = this.rtlTranslate,
						i = this.translate,
						n = this.$wrapperEl;
					if (t.virtualTranslate) return a ? -i : i;
					var r = p.getTranslate(n[0], e);
					return a && (r = -r), r || 0;
				},
				setTranslate: function (e, t) {
					var a = this,
						i = a.rtlTranslate,
						n = a.params,
						r = a.$wrapperEl,
						s = a.progress,
						o = 0,
						l = 0;
					a.isHorizontal() ? (o = i ? -e : e) : (l = e),
						n.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
						n.virtualTranslate ||
							(h.transforms3d
								? r.transform('translate3d(' + o + 'px, ' + l + 'px, 0px)')
								: r.transform('translate(' + o + 'px, ' + l + 'px)')),
						(a.previousTranslate = a.translate),
						(a.translate = a.isHorizontal() ? o : l);
					var d = a.maxTranslate() - a.minTranslate();
					(0 == d ? 0 : (e - a.minTranslate()) / d) !== s &&
						a.updateProgress(e),
						a.emit('setTranslate', a.translate, t);
				},
				minTranslate: function () {
					return -this.snapGrid[0];
				},
				maxTranslate: function () {
					return -this.snapGrid[this.snapGrid.length - 1];
				},
			},
			b = {
				setTransition: function (e, t) {
					this.$wrapperEl.transition(e), this.emit('setTransition', e, t);
				},
				transitionStart: function (e, t) {
					void 0 === e && (e = !0);
					var a = this,
						i = a.activeIndex,
						n = a.params,
						r = a.previousIndex;
					n.autoHeight && a.updateAutoHeight();
					var s = t;
					if (
						((s = s || (r < i ? 'next' : i < r ? 'prev' : 'reset')),
						a.emit('transitionStart'),
						e && i !== r)
					) {
						if ('reset' === s) return void a.emit('slideResetTransitionStart');
						a.emit('slideChangeTransitionStart'),
							'next' === s
								? a.emit('slideNextTransitionStart')
								: a.emit('slidePrevTransitionStart');
					}
				},
				transitionEnd: function (e, t) {
					void 0 === e && (e = !0);
					var a = this,
						i = a.activeIndex,
						n = a.previousIndex;
					(a.animating = !1), a.setTransition(0);
					var r = t;
					if (
						((r = r || (n < i ? 'next' : i < n ? 'prev' : 'reset')),
						a.emit('transitionEnd'),
						e && i !== n)
					) {
						if ('reset' === r) return void a.emit('slideResetTransitionEnd');
						a.emit('slideChangeTransitionEnd'),
							'next' === r
								? a.emit('slideNextTransitionEnd')
								: a.emit('slidePrevTransitionEnd');
					}
				},
			},
			y = {
				slideTo: function (e, t, a, i) {
					void 0 === e && (e = 0),
						void 0 === t && (t = this.params.speed),
						void 0 === a && (a = !0);
					var n = this,
						r = e;
					r < 0 && (r = 0);
					var s = n.params,
						o = n.snapGrid,
						l = n.slidesGrid,
						d = n.previousIndex,
						c = n.activeIndex,
						u = n.rtlTranslate;
					if (n.animating && s.preventInteractionOnTransition) return !1;
					var p = Math.floor(r / s.slidesPerGroup);
					p >= o.length && (p = o.length - 1),
						(c || s.initialSlide || 0) === (d || 0) &&
							a &&
							n.emit('beforeSlideChangeStart');
					var f,
						m = -o[p];
					if ((n.updateProgress(m), s.normalizeSlideIndex))
						for (var g = 0; g < l.length; g += 1)
							-Math.floor(100 * m) >= Math.floor(100 * l[g]) && (r = g);
					if (n.initialized && r !== c) {
						if (!n.allowSlideNext && m < n.translate && m < n.minTranslate())
							return !1;
						if (
							!n.allowSlidePrev &&
							m > n.translate &&
							m > n.maxTranslate() &&
							(c || 0) !== r
						)
							return !1;
					}
					return (
						(f = c < r ? 'next' : r < c ? 'prev' : 'reset'),
						(u && -m === n.translate) || (!u && m === n.translate)
							? (n.updateActiveIndex(r),
							  s.autoHeight && n.updateAutoHeight(),
							  n.updateSlidesClasses(),
							  'slide' !== s.effect && n.setTranslate(m),
							  'reset' !== f &&
									(n.transitionStart(a, f), n.transitionEnd(a, f)),
							  !1)
							: (0 !== t && h.transition
									? (n.setTransition(t),
									  n.setTranslate(m),
									  n.updateActiveIndex(r),
									  n.updateSlidesClasses(),
									  n.emit('beforeTransitionStart', t, i),
									  n.transitionStart(a, f),
									  n.animating ||
											((n.animating = !0),
											n.onSlideToWrapperTransitionEnd ||
												(n.onSlideToWrapperTransitionEnd = function (e) {
													n &&
														!n.destroyed &&
														e.target === this &&
														(n.$wrapperEl[0].removeEventListener(
															'transitionend',
															n.onSlideToWrapperTransitionEnd
														),
														n.$wrapperEl[0].removeEventListener(
															'webkitTransitionEnd',
															n.onSlideToWrapperTransitionEnd
														),
														(n.onSlideToWrapperTransitionEnd = null),
														delete n.onSlideToWrapperTransitionEnd,
														n.transitionEnd(a, f));
												}),
											n.$wrapperEl[0].addEventListener(
												'transitionend',
												n.onSlideToWrapperTransitionEnd
											),
											n.$wrapperEl[0].addEventListener(
												'webkitTransitionEnd',
												n.onSlideToWrapperTransitionEnd
											)))
									: (n.setTransition(0),
									  n.setTranslate(m),
									  n.updateActiveIndex(r),
									  n.updateSlidesClasses(),
									  n.emit('beforeTransitionStart', t, i),
									  n.transitionStart(a, f),
									  n.transitionEnd(a, f)),
							  !0)
					);
				},
				slideToLoop: function (e, t, a, i) {
					void 0 === e && (e = 0),
						void 0 === t && (t = this.params.speed),
						void 0 === a && (a = !0);
					var n = e;
					return (
						this.params.loop && (n += this.loopedSlides),
						this.slideTo(n, t, a, i)
					);
				},
				slideNext: function (e, t, a) {
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
					var i = this,
						n = i.params,
						r = i.animating;
					return n.loop
						? !r &&
								(i.loopFix(),
								(i._clientLeft = i.$wrapperEl[0].clientLeft),
								i.slideTo(i.activeIndex + n.slidesPerGroup, e, t, a))
						: i.slideTo(i.activeIndex + n.slidesPerGroup, e, t, a);
				},
				slidePrev: function (e, t, a) {
					function i(e) {
						return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
					}
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
					var n = this,
						r = n.params,
						s = n.animating,
						o = n.snapGrid,
						l = n.slidesGrid,
						d = n.rtlTranslate;
					if (r.loop) {
						if (s) return !1;
						n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
					}
					var c,
						u = i(d ? n.translate : -n.translate),
						p = o.map(function (e) {
							return i(e);
						}),
						h =
							(l.map(function (e) {
								return i(e);
							}),
							o[p.indexOf(u)],
							o[p.indexOf(u) - 1]);
					return (
						void 0 !== h && (c = l.indexOf(h)) < 0 && (c = n.activeIndex - 1),
						n.slideTo(c, e, t, a)
					);
				},
				slideReset: function (e, t, a) {
					return (
						void 0 === e && (e = this.params.speed),
						void 0 === t && (t = !0),
						this.slideTo(this.activeIndex, e, t, a)
					);
				},
				slideToClosest: function (e, t, a) {
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
					var i = this,
						n = i.activeIndex,
						r = Math.floor(n / i.params.slidesPerGroup);
					if (r < i.snapGrid.length - 1) {
						var s = i.rtlTranslate ? i.translate : -i.translate,
							o = i.snapGrid[r];
						(i.snapGrid[r + 1] - o) / 2 < s - o &&
							(n = i.params.slidesPerGroup);
					}
					return i.slideTo(n, e, t, a);
				},
				slideToClickedSlide: function () {
					var t,
						a = this,
						i = a.params,
						n = a.$wrapperEl,
						r =
							'auto' === i.slidesPerView
								? a.slidesPerViewDynamic()
								: i.slidesPerView,
						s = a.clickedIndex;
					if (i.loop) {
						if (a.animating) return;
						(t = parseInt(
							e(a.clickedSlide).attr('data-swiper-slide-index'),
							10
						)),
							i.centeredSlides
								? s < a.loopedSlides - r / 2 ||
								  s > a.slides.length - a.loopedSlides + r / 2
									? (a.loopFix(),
									  (s = n
											.children(
												'.' +
													i.slideClass +
													'[data-swiper-slide-index="' +
													t +
													'"]:not(.' +
													i.slideDuplicateClass +
													')'
											)
											.eq(0)
											.index()),
									  p.nextTick(function () {
											a.slideTo(s);
									  }))
									: a.slideTo(s)
								: s > a.slides.length - r
								? (a.loopFix(),
								  (s = n
										.children(
											'.' +
												i.slideClass +
												'[data-swiper-slide-index="' +
												t +
												'"]:not(.' +
												i.slideDuplicateClass +
												')'
										)
										.eq(0)
										.index()),
								  p.nextTick(function () {
										a.slideTo(s);
								  }))
								: a.slideTo(s);
					} else a.slideTo(s);
				},
			},
			w = {
				loopCreate: function () {
					var t = this,
						a = t.params,
						i = t.$wrapperEl;
					i.children('.' + a.slideClass + '.' + a.slideDuplicateClass).remove();
					var r = i.children('.' + a.slideClass);
					if (a.loopFillGroupWithBlank) {
						var s = a.slidesPerGroup - (r.length % a.slidesPerGroup);
						if (s !== a.slidesPerGroup) {
							for (var o = 0; o < s; o += 1) {
								var l = e(n.createElement('div')).addClass(
									a.slideClass + ' ' + a.slideBlankClass
								);
								i.append(l);
							}
							r = i.children('.' + a.slideClass);
						}
					}
					'auto' !== a.slidesPerView ||
						a.loopedSlides ||
						(a.loopedSlides = r.length),
						(t.loopedSlides = parseInt(a.loopedSlides || a.slidesPerView, 10)),
						(t.loopedSlides += a.loopAdditionalSlides),
						t.loopedSlides > r.length && (t.loopedSlides = r.length);
					var d = [],
						c = [];
					r.each(function (a, i) {
						var n = e(i);
						a < t.loopedSlides && c.push(i),
							a < r.length && a >= r.length - t.loopedSlides && d.push(i),
							n.attr('data-swiper-slide-index', a);
					});
					for (var u = 0; u < c.length; u += 1)
						i.append(e(c[u].cloneNode(!0)).addClass(a.slideDuplicateClass));
					for (var p = d.length - 1; 0 <= p; p -= 1)
						i.prepend(e(d[p].cloneNode(!0)).addClass(a.slideDuplicateClass));
				},
				loopFix: function () {
					var e,
						t = this,
						a = t.params,
						i = t.activeIndex,
						n = t.slides,
						r = t.loopedSlides,
						s = t.allowSlidePrev,
						o = t.allowSlideNext,
						l = t.snapGrid,
						d = t.rtlTranslate;
					(t.allowSlidePrev = !0), (t.allowSlideNext = !0);
					var c = -l[i] - t.getTranslate();
					i < r
						? ((e = n.length - 3 * r + i),
						  (e += r),
						  t.slideTo(e, 0, !1, !0) &&
								0 != c &&
								t.setTranslate((d ? -t.translate : t.translate) - c))
						: (('auto' === a.slidesPerView && 2 * r <= i) ||
								i >= n.length - r) &&
						  ((e = -n.length + i + r),
						  (e += r),
						  t.slideTo(e, 0, !1, !0) &&
								0 != c &&
								t.setTranslate((d ? -t.translate : t.translate) - c)),
						(t.allowSlidePrev = s),
						(t.allowSlideNext = o);
				},
				loopDestroy: function () {
					var e = this.$wrapperEl,
						t = this.params,
						a = this.slides;
					e
						.children(
							'.' +
								t.slideClass +
								'.' +
								t.slideDuplicateClass +
								',.' +
								t.slideClass +
								'.' +
								t.slideBlankClass
						)
						.remove(),
						a.removeAttr('data-swiper-slide-index');
				},
			},
			E = {
				setGrabCursor: function (e) {
					if (
						!(
							h.touch ||
							!this.params.simulateTouch ||
							(this.params.watchOverflow && this.isLocked)
						)
					) {
						var t = this.el;
						(t.style.cursor = 'move'),
							(t.style.cursor = e ? '-webkit-grabbing' : '-webkit-grab'),
							(t.style.cursor = e ? '-moz-grabbin' : '-moz-grab'),
							(t.style.cursor = e ? 'grabbing' : 'grab');
					}
				},
				unsetGrabCursor: function () {
					h.touch ||
						(this.params.watchOverflow && this.isLocked) ||
						(this.el.style.cursor = '');
				},
			},
			x = {
				appendSlide: function (e) {
					var t = this,
						a = t.$wrapperEl,
						i = t.params;
					if (
						(i.loop && t.loopDestroy(), 'object' == typeof e && 'length' in e)
					)
						for (var n = 0; n < e.length; n += 1) e[n] && a.append(e[n]);
					else a.append(e);
					i.loop && t.loopCreate(), (i.observer && h.observer) || t.update();
				},
				prependSlide: function (e) {
					var t = this,
						a = t.params,
						i = t.$wrapperEl,
						n = t.activeIndex;
					a.loop && t.loopDestroy();
					var r = n + 1;
					if ('object' == typeof e && 'length' in e) {
						for (var s = 0; s < e.length; s += 1) e[s] && i.prepend(e[s]);
						r = n + e.length;
					} else i.prepend(e);
					a.loop && t.loopCreate(),
						(a.observer && h.observer) || t.update(),
						t.slideTo(r, 0, !1);
				},
				addSlide: function (e, t) {
					var a = this,
						i = a.$wrapperEl,
						n = a.params,
						r = a.activeIndex;
					n.loop &&
						((r -= a.loopedSlides),
						a.loopDestroy(),
						(a.slides = i.children('.' + n.slideClass)));
					var s = a.slides.length;
					if (e <= 0) a.prependSlide(t);
					else if (s <= e) a.appendSlide(t);
					else {
						for (var o = e < r ? r + 1 : r, l = [], d = s - 1; e <= d; d -= 1) {
							var c = a.slides.eq(d);
							c.remove(), l.unshift(c);
						}
						if ('object' == typeof t && 'length' in t) {
							for (var u = 0; u < t.length; u += 1) t[u] && i.append(t[u]);
							o = e < r ? r + t.length : r;
						} else i.append(t);
						for (var p = 0; p < l.length; p += 1) i.append(l[p]);
						n.loop && a.loopCreate(),
							(n.observer && h.observer) || a.update(),
							n.loop
								? a.slideTo(o + a.loopedSlides, 0, !1)
								: a.slideTo(o, 0, !1);
					}
				},
				removeSlide: function (e) {
					var t = this,
						a = t.params,
						i = t.$wrapperEl,
						n = t.activeIndex;
					a.loop &&
						((n -= t.loopedSlides),
						t.loopDestroy(),
						(t.slides = i.children('.' + a.slideClass)));
					var r,
						s = n;
					if ('object' == typeof e && 'length' in e) {
						for (var o = 0; o < e.length; o += 1)
							(r = e[o]),
								t.slides[r] && t.slides.eq(r).remove(),
								r < s && (s -= 1);
						s = Math.max(s, 0);
					} else
						(r = e),
							t.slides[r] && t.slides.eq(r).remove(),
							r < s && (s -= 1),
							(s = Math.max(s, 0));
					a.loop && t.loopCreate(),
						(a.observer && h.observer) || t.update(),
						a.loop ? t.slideTo(s + t.loopedSlides, 0, !1) : t.slideTo(s, 0, !1);
				},
				removeAllSlides: function () {
					for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
					this.removeSlide(e);
				},
			},
			S = (function () {
				var e = r.navigator.userAgent,
					t = {
						ios: !1,
						android: !1,
						androidChrome: !1,
						desktop: !1,
						windows: !1,
						iphone: !1,
						ipod: !1,
						ipad: !1,
						cordova: r.cordova || r.phonegap,
						phonegap: r.cordova || r.phonegap,
					},
					a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
					i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
					s = e.match(/(iPad).*OS\s([\d_]+)/),
					o = e.match(/(iPod)(.*OS\s([\d_]+))?/),
					l = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
				if (
					(a && ((t.os = 'windows'), (t.osVersion = a[2]), (t.windows = !0)),
					i &&
						!a &&
						((t.os = 'android'),
						(t.osVersion = i[2]),
						(t.android = !0),
						(t.androidChrome = 0 <= e.toLowerCase().indexOf('chrome'))),
					(s || l || o) && ((t.os = 'ios'), (t.ios = !0)),
					l && !o && ((t.osVersion = l[2].replace(/_/g, '.')), (t.iphone = !0)),
					s && ((t.osVersion = s[2].replace(/_/g, '.')), (t.ipad = !0)),
					o &&
						((t.osVersion = o[3] ? o[3].replace(/_/g, '.') : null),
						(t.iphone = !0)),
					t.ios &&
						t.osVersion &&
						0 <= e.indexOf('Version/') &&
						'10' === t.osVersion.split('.')[0] &&
						(t.osVersion = e.toLowerCase().split('version/')[1].split(' ')[0]),
					(t.desktop = !(t.os || t.android || t.webView)),
					(t.webView = (l || s || o) && e.match(/.*AppleWebKit(?!.*Safari)/i)),
					t.os && 'ios' === t.os)
				) {
					var d = t.osVersion.split('.'),
						c = n.querySelector('meta[name="viewport"]');
					t.minimalUi =
						!t.webView &&
						(o || l) &&
						(1 * d[0] == 7 ? 1 <= 1 * d[1] : 7 < 1 * d[0]) &&
						c &&
						0 <= c.getAttribute('content').indexOf('minimal-ui');
				}
				return (t.pixelRatio = r.devicePixelRatio || 1), t;
			})(),
			T = {
				init: !0,
				direction: 'horizontal',
				touchEventsTarget: 'container',
				initialSlide: 0,
				speed: 300,
				preventInteractionOnTransition: !1,
				edgeSwipeDetection: !1,
				edgeSwipeThreshold: 20,
				freeMode: !1,
				freeModeMomentum: !0,
				freeModeMomentumRatio: 1,
				freeModeMomentumBounce: !0,
				freeModeMomentumBounceRatio: 1,
				freeModeMomentumVelocityRatio: 1,
				freeModeSticky: !1,
				freeModeMinimumVelocity: 0.02,
				autoHeight: !1,
				setWrapperSize: !1,
				virtualTranslate: !1,
				effect: 'slide',
				breakpoints: void 0,
				breakpointsInverse: !1,
				spaceBetween: 0,
				slidesPerView: 1,
				slidesPerColumn: 1,
				slidesPerColumnFill: 'column',
				slidesPerGroup: 1,
				centeredSlides: !1,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
				normalizeSlideIndex: !0,
				centerInsufficientSlides: !1,
				watchOverflow: !1,
				roundLengths: !1,
				touchRatio: 1,
				touchAngle: 45,
				simulateTouch: !0,
				shortSwipes: !0,
				longSwipes: !0,
				longSwipesRatio: 0.5,
				longSwipesMs: 300,
				followFinger: !0,
				allowTouchMove: !0,
				threshold: 0,
				touchMoveStopPropagation: !0,
				touchStartPreventDefault: !0,
				touchStartForcePreventDefault: !1,
				touchReleaseOnEdges: !1,
				uniqueNavElements: !0,
				resistance: !0,
				resistanceRatio: 0.85,
				watchSlidesProgress: !1,
				watchSlidesVisibility: !1,
				grabCursor: !1,
				preventClicks: !0,
				preventClicksPropagation: !0,
				slideToClickedSlide: !1,
				preloadImages: !0,
				updateOnImagesReady: !0,
				loop: !1,
				loopAdditionalSlides: 0,
				loopedSlides: null,
				loopFillGroupWithBlank: !1,
				allowSlidePrev: !0,
				allowSlideNext: !0,
				swipeHandler: null,
				noSwiping: !0,
				noSwipingClass: 'swiper-no-swiping',
				noSwipingSelector: null,
				passiveListeners: !0,
				containerModifierClass: 'swiper-container-',
				slideClass: 'swiper-slide',
				slideBlankClass: 'swiper-slide-invisible-blank',
				slideActiveClass: 'swiper-slide-active',
				slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
				slideVisibleClass: 'swiper-slide-visible',
				slideDuplicateClass: 'swiper-slide-duplicate',
				slideNextClass: 'swiper-slide-next',
				slideDuplicateNextClass: 'swiper-slide-duplicate-next',
				slidePrevClass: 'swiper-slide-prev',
				slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
				wrapperClass: 'swiper-wrapper',
				runCallbacksOnInit: !0,
			},
			C = {
				update: g,
				translate: v,
				transition: b,
				slide: y,
				loop: w,
				grabCursor: E,
				manipulation: x,
				events: {
					attachEvents: function () {
						var t = this,
							a = t.params,
							s = t.touchEvents,
							o = t.el,
							l = t.wrapperEl;
						(t.onTouchStart = function (t) {
							var a = this,
								i = a.touchEventsData,
								s = a.params,
								o = a.touches;
							if (!a.animating || !s.preventInteractionOnTransition) {
								var l = t;
								if (
									(l.originalEvent && (l = l.originalEvent),
									(i.isTouchEvent = 'touchstart' === l.type),
									(i.isTouchEvent || !('which' in l) || 3 !== l.which) &&
										!(
											(!i.isTouchEvent && 'button' in l && 0 < l.button) ||
											(i.isTouched && i.isMoved)
										))
								)
									if (
										s.noSwiping &&
										e(l.target).closest(
											s.noSwipingSelector
												? s.noSwipingSelector
												: '.' + s.noSwipingClass
										)[0]
									)
										a.allowClick = !0;
									else if (!s.swipeHandler || e(l).closest(s.swipeHandler)[0]) {
										(o.currentX =
											'touchstart' === l.type
												? l.targetTouches[0].pageX
												: l.pageX),
											(o.currentY =
												'touchstart' === l.type
													? l.targetTouches[0].pageY
													: l.pageY);
										var d = o.currentX,
											c = o.currentY,
											u = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
											h = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
										if (!u || !(d <= h || d >= r.screen.width - h)) {
											if (
												(p.extend(i, {
													isTouched: !0,
													isMoved: !1,
													allowTouchCallbacks: !0,
													isScrolling: void 0,
													startMoving: void 0,
												}),
												(o.startX = d),
												(o.startY = c),
												(i.touchStartTime = p.now()),
												(a.allowClick = !0),
												a.updateSize(),
												(a.swipeDirection = void 0),
												0 < s.threshold && (i.allowThresholdMove = !1),
												'touchstart' !== l.type)
											) {
												var f = !0;
												e(l.target).is(i.formElements) && (f = !1),
													n.activeElement &&
														e(n.activeElement).is(i.formElements) &&
														n.activeElement !== l.target &&
														n.activeElement.blur();
												var m =
													f && a.allowTouchMove && s.touchStartPreventDefault;
												(s.touchStartForcePreventDefault || m) &&
													l.preventDefault();
											}
											a.emit('touchStart', l);
										}
									}
							}
						}.bind(t)),
							(t.onTouchMove = function (t) {
								var a = this,
									i = a.touchEventsData,
									r = a.params,
									s = a.touches,
									o = a.rtlTranslate,
									l = t;
								if ((l.originalEvent && (l = l.originalEvent), i.isTouched)) {
									if (!i.isTouchEvent || 'mousemove' !== l.type) {
										var d =
												'touchmove' === l.type
													? l.targetTouches[0].pageX
													: l.pageX,
											c =
												'touchmove' === l.type
													? l.targetTouches[0].pageY
													: l.pageY;
										if (l.preventedByNestedSwiper)
											return (s.startX = d), void (s.startY = c);
										if (!a.allowTouchMove)
											return (
												(a.allowClick = !1),
												void (
													i.isTouched &&
													(p.extend(s, {
														startX: d,
														startY: c,
														currentX: d,
														currentY: c,
													}),
													(i.touchStartTime = p.now()))
												)
											);
										if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
											if (a.isVertical()) {
												if (
													(c < s.startY && a.translate <= a.maxTranslate()) ||
													(c > s.startY && a.translate >= a.minTranslate())
												)
													return (i.isTouched = !1), void (i.isMoved = !1);
											} else if (
												(d < s.startX && a.translate <= a.maxTranslate()) ||
												(d > s.startX && a.translate >= a.minTranslate())
											)
												return;
										if (
											i.isTouchEvent &&
											n.activeElement &&
											l.target === n.activeElement &&
											e(l.target).is(i.formElements)
										)
											return (i.isMoved = !0), void (a.allowClick = !1);
										if (
											(i.allowTouchCallbacks && a.emit('touchMove', l),
											!(l.targetTouches && 1 < l.targetTouches.length))
										) {
											(s.currentX = d), (s.currentY = c);
											var u = s.currentX - s.startX,
												h = s.currentY - s.startY,
												f;
											if (
												!(
													a.params.threshold &&
													Math.sqrt(Math.pow(u, 2) + Math.pow(h, 2)) <
														a.params.threshold
												)
											)
												if (
													(void 0 === i.isScrolling &&
														((a.isHorizontal() && s.currentY === s.startY) ||
														(a.isVertical() && s.currentX === s.startX)
															? (i.isScrolling = !1)
															: 25 <= u * u + h * h &&
															  ((f =
																	(180 * Math.atan2(Math.abs(h), Math.abs(u))) /
																	Math.PI),
															  (i.isScrolling = a.isHorizontal()
																	? f > r.touchAngle
																	: 90 - f > r.touchAngle))),
													i.isScrolling && a.emit('touchMoveOpposite', l),
													void 0 === i.startMoving &&
														((s.currentX === s.startX &&
															s.currentY === s.startY) ||
															(i.startMoving = !0)),
													i.isScrolling)
												)
													i.isTouched = !1;
												else if (i.startMoving) {
													(a.allowClick = !1),
														l.preventDefault(),
														r.touchMoveStopPropagation &&
															!r.nested &&
															l.stopPropagation(),
														i.isMoved ||
															(r.loop && a.loopFix(),
															(i.startTranslate = a.getTranslate()),
															a.setTransition(0),
															a.animating &&
																a.$wrapperEl.trigger(
																	'webkitTransitionEnd transitionend'
																),
															(i.allowMomentumBounce = !1),
															!r.grabCursor ||
																(!0 !== a.allowSlideNext &&
																	!0 !== a.allowSlidePrev) ||
																a.setGrabCursor(!0),
															a.emit('sliderFirstMove', l)),
														a.emit('sliderMove', l),
														(i.isMoved = !0);
													var m = a.isHorizontal() ? u : h;
													(s.diff = m),
														(m *= r.touchRatio),
														o && (m = -m),
														(a.swipeDirection = 0 < m ? 'prev' : 'next'),
														(i.currentTranslate = m + i.startTranslate);
													var g = !0,
														v = r.resistanceRatio;
													if (
														(r.touchReleaseOnEdges && (v = 0),
														0 < m && i.currentTranslate > a.minTranslate()
															? ((g = !1),
															  r.resistance &&
																	(i.currentTranslate =
																		a.minTranslate() -
																		1 +
																		Math.pow(
																			-a.minTranslate() + i.startTranslate + m,
																			v
																		)))
															: m < 0 &&
															  i.currentTranslate < a.maxTranslate() &&
															  ((g = !1),
															  r.resistance &&
																	(i.currentTranslate =
																		a.maxTranslate() +
																		1 -
																		Math.pow(
																			a.maxTranslate() - i.startTranslate - m,
																			v
																		))),
														g && (l.preventedByNestedSwiper = !0),
														!a.allowSlideNext &&
															'next' === a.swipeDirection &&
															i.currentTranslate < i.startTranslate &&
															(i.currentTranslate = i.startTranslate),
														!a.allowSlidePrev &&
															'prev' === a.swipeDirection &&
															i.currentTranslate > i.startTranslate &&
															(i.currentTranslate = i.startTranslate),
														0 < r.threshold)
													) {
														if (
															!(
																Math.abs(m) > r.threshold ||
																i.allowThresholdMove
															)
														)
															return void (i.currentTranslate =
																i.startTranslate);
														if (!i.allowThresholdMove)
															return (
																(i.allowThresholdMove = !0),
																(s.startX = s.currentX),
																(s.startY = s.currentY),
																(i.currentTranslate = i.startTranslate),
																void (s.diff = a.isHorizontal()
																	? s.currentX - s.startX
																	: s.currentY - s.startY)
															);
													}
													r.followFinger &&
														((r.freeMode ||
															r.watchSlidesProgress ||
															r.watchSlidesVisibility) &&
															(a.updateActiveIndex(), a.updateSlidesClasses()),
														r.freeMode &&
															(0 === i.velocities.length &&
																i.velocities.push({
																	position:
																		s[a.isHorizontal() ? 'startX' : 'startY'],
																	time: i.touchStartTime,
																}),
															i.velocities.push({
																position:
																	s[a.isHorizontal() ? 'currentX' : 'currentY'],
																time: p.now(),
															})),
														a.updateProgress(i.currentTranslate),
														a.setTranslate(i.currentTranslate));
												}
										}
									}
								} else
									i.startMoving &&
										i.isScrolling &&
										a.emit('touchMoveOpposite', l);
							}.bind(t)),
							(t.onTouchEnd = function (e) {
								var t = this,
									a = t.touchEventsData,
									i = t.params,
									n = t.touches,
									r = t.rtlTranslate,
									s = t.$wrapperEl,
									o = t.slidesGrid,
									l = t.snapGrid,
									d = e;
								if (
									(d.originalEvent && (d = d.originalEvent),
									a.allowTouchCallbacks && t.emit('touchEnd', d),
									(a.allowTouchCallbacks = !1),
									!a.isTouched)
								)
									return (
										a.isMoved && i.grabCursor && t.setGrabCursor(!1),
										(a.isMoved = !1),
										void (a.startMoving = !1)
									);
								i.grabCursor &&
									a.isMoved &&
									a.isTouched &&
									(!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
									t.setGrabCursor(!1);
								var c,
									u = p.now(),
									h = u - a.touchStartTime;
								if (
									(t.allowClick &&
										(t.updateClickedSlide(d),
										t.emit('tap', d),
										h < 300 &&
											300 < u - a.lastClickTime &&
											(a.clickTimeout && clearTimeout(a.clickTimeout),
											(a.clickTimeout = p.nextTick(function () {
												t && !t.destroyed && t.emit('click', d);
											}, 300))),
										h < 300 &&
											u - a.lastClickTime < 300 &&
											(a.clickTimeout && clearTimeout(a.clickTimeout),
											t.emit('doubleTap', d))),
									(a.lastClickTime = p.now()),
									p.nextTick(function () {
										t.destroyed || (t.allowClick = !0);
									}),
									!a.isTouched ||
										!a.isMoved ||
										!t.swipeDirection ||
										0 === n.diff ||
										a.currentTranslate === a.startTranslate)
								)
									return (
										(a.isTouched = !1),
										(a.isMoved = !1),
										void (a.startMoving = !1)
									);
								if (
									((a.isTouched = !1),
									(a.isMoved = !1),
									(a.startMoving = !1),
									(c = i.followFinger
										? r
											? t.translate
											: -t.translate
										: -a.currentTranslate),
									i.freeMode)
								) {
									if (c < -t.minTranslate())
										return void t.slideTo(t.activeIndex);
									if (c > -t.maxTranslate())
										return void (t.slides.length < l.length
											? t.slideTo(l.length - 1)
											: t.slideTo(t.slides.length - 1));
									if (i.freeModeMomentum) {
										if (1 < a.velocities.length) {
											var f = a.velocities.pop(),
												m = a.velocities.pop(),
												g = f.position - m.position,
												v = f.time - m.time;
											(t.velocity = g / v),
												(t.velocity /= 2),
												Math.abs(t.velocity) < i.freeModeMinimumVelocity &&
													(t.velocity = 0),
												(150 < v || 300 < p.now() - f.time) && (t.velocity = 0);
										} else t.velocity = 0;
										(t.velocity *= i.freeModeMomentumVelocityRatio),
											(a.velocities.length = 0);
										var b = 1e3 * i.freeModeMomentumRatio,
											y = t.velocity * b,
											w = t.translate + y;
										r && (w = -w);
										var E,
											x,
											S = !1,
											T =
												20 *
												Math.abs(t.velocity) *
												i.freeModeMomentumBounceRatio;
										if (w < t.maxTranslate())
											i.freeModeMomentumBounce
												? (w + t.maxTranslate() < -T &&
														(w = t.maxTranslate() - T),
												  (E = t.maxTranslate()),
												  (S = !0),
												  (a.allowMomentumBounce = !0))
												: (w = t.maxTranslate()),
												i.loop && i.centeredSlides && (x = !0);
										else if (w > t.minTranslate())
											i.freeModeMomentumBounce
												? (w - t.minTranslate() > T &&
														(w = t.minTranslate() + T),
												  (E = t.minTranslate()),
												  (S = !0),
												  (a.allowMomentumBounce = !0))
												: (w = t.minTranslate()),
												i.loop && i.centeredSlides && (x = !0);
										else if (i.freeModeSticky) {
											for (var C, _ = 0; _ < l.length; _ += 1)
												if (l[_] > -w) {
													C = _;
													break;
												}
											w = -(w =
												Math.abs(l[C] - w) < Math.abs(l[C - 1] - w) ||
												'next' === t.swipeDirection
													? l[C]
													: l[C - 1]);
										}
										if (
											(x &&
												t.once('transitionEnd', function () {
													t.loopFix();
												}),
											0 !== t.velocity)
										)
											b = r
												? Math.abs((-w - t.translate) / t.velocity)
												: Math.abs((w - t.translate) / t.velocity);
										else if (i.freeModeSticky) return void t.slideToClosest();
										i.freeModeMomentumBounce && S
											? (t.updateProgress(E),
											  t.setTransition(b),
											  t.setTranslate(w),
											  t.transitionStart(!0, t.swipeDirection),
											  (t.animating = !0),
											  s.transitionEnd(function () {
													t &&
														!t.destroyed &&
														a.allowMomentumBounce &&
														(t.emit('momentumBounce'),
														t.setTransition(i.speed),
														t.setTranslate(E),
														s.transitionEnd(function () {
															t && !t.destroyed && t.transitionEnd();
														}));
											  }))
											: t.velocity
											? (t.updateProgress(w),
											  t.setTransition(b),
											  t.setTranslate(w),
											  t.transitionStart(!0, t.swipeDirection),
											  t.animating ||
													((t.animating = !0),
													s.transitionEnd(function () {
														t && !t.destroyed && t.transitionEnd();
													})))
											: t.updateProgress(w),
											t.updateActiveIndex(),
											t.updateSlidesClasses();
									} else if (i.freeModeSticky) return void t.slideToClosest();
									(!i.freeModeMomentum || h >= i.longSwipesMs) &&
										(t.updateProgress(),
										t.updateActiveIndex(),
										t.updateSlidesClasses());
								} else {
									for (
										var M = 0, k = t.slidesSizesGrid[0], O = 0;
										O < o.length;
										O += i.slidesPerGroup
									)
										void 0 !== o[O + i.slidesPerGroup]
											? c >= o[O] &&
											  c < o[O + i.slidesPerGroup] &&
											  (k = o[(M = O) + i.slidesPerGroup] - o[O])
											: c >= o[O] &&
											  ((M = O), (k = o[o.length - 1] - o[o.length - 2]));
									var N = (c - o[M]) / k;
									if (h > i.longSwipesMs) {
										if (!i.longSwipes) return void t.slideTo(t.activeIndex);
										'next' === t.swipeDirection &&
											(N >= i.longSwipesRatio
												? t.slideTo(M + i.slidesPerGroup)
												: t.slideTo(M)),
											'prev' === t.swipeDirection &&
												(N > 1 - i.longSwipesRatio
													? t.slideTo(M + i.slidesPerGroup)
													: t.slideTo(M));
									} else {
										if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
										'next' === t.swipeDirection &&
											t.slideTo(M + i.slidesPerGroup),
											'prev' === t.swipeDirection && t.slideTo(M);
									}
								}
							}.bind(t)),
							(t.onClick = function (e) {
								this.allowClick ||
									(this.params.preventClicks && e.preventDefault(),
									this.params.preventClicksPropagation &&
										this.animating &&
										(e.stopPropagation(), e.stopImmediatePropagation()));
							}.bind(t));
						var d = 'container' === a.touchEventsTarget ? o : l,
							c = !!a.nested;
						if (h.touch || (!h.pointerEvents && !h.prefixedPointerEvents)) {
							if (h.touch) {
								var u = !(
									'touchstart' !== s.start ||
									!h.passiveListener ||
									!a.passiveListeners
								) && { passive: !0, capture: !1 };
								d.addEventListener(s.start, t.onTouchStart, u),
									d.addEventListener(
										s.move,
										t.onTouchMove,
										h.passiveListener ? { passive: !1, capture: c } : c
									),
									d.addEventListener(s.end, t.onTouchEnd, u);
							}
							((a.simulateTouch && !S.ios && !S.android) ||
								(a.simulateTouch && !h.touch && S.ios)) &&
								(d.addEventListener('mousedown', t.onTouchStart, !1),
								n.addEventListener('mousemove', t.onTouchMove, c),
								n.addEventListener('mouseup', t.onTouchEnd, !1));
						} else
							d.addEventListener(s.start, t.onTouchStart, !1),
								n.addEventListener(s.move, t.onTouchMove, c),
								n.addEventListener(s.end, t.onTouchEnd, !1);
						(a.preventClicks || a.preventClicksPropagation) &&
							d.addEventListener('click', t.onClick, !0),
							t.on(
								S.ios || S.android
									? 'resize orientationchange observerUpdate'
									: 'resize observerUpdate',
								i,
								!0
							);
					},
					detachEvents: function () {
						var e = this,
							t = e.params,
							a = e.touchEvents,
							r = e.el,
							s = e.wrapperEl,
							o = 'container' === t.touchEventsTarget ? r : s,
							l = !!t.nested;
						if (h.touch || (!h.pointerEvents && !h.prefixedPointerEvents)) {
							if (h.touch) {
								var d = !(
									'onTouchStart' !== a.start ||
									!h.passiveListener ||
									!t.passiveListeners
								) && { passive: !0, capture: !1 };
								o.removeEventListener(a.start, e.onTouchStart, d),
									o.removeEventListener(a.move, e.onTouchMove, l),
									o.removeEventListener(a.end, e.onTouchEnd, d);
							}
							((t.simulateTouch && !S.ios && !S.android) ||
								(t.simulateTouch && !h.touch && S.ios)) &&
								(o.removeEventListener('mousedown', e.onTouchStart, !1),
								n.removeEventListener('mousemove', e.onTouchMove, l),
								n.removeEventListener('mouseup', e.onTouchEnd, !1));
						} else
							o.removeEventListener(a.start, e.onTouchStart, !1),
								n.removeEventListener(a.move, e.onTouchMove, l),
								n.removeEventListener(a.end, e.onTouchEnd, !1);
						(t.preventClicks || t.preventClicksPropagation) &&
							o.removeEventListener('click', e.onClick, !0),
							e.off(
								S.ios || S.android
									? 'resize orientationchange observerUpdate'
									: 'resize observerUpdate',
								i
							);
					},
				},
				breakpoints: {
					setBreakpoint: function () {
						var e = this,
							t = e.activeIndex,
							a = e.initialized,
							i = e.loopedSlides;
						void 0 === i && (i = 0);
						var n = e.params,
							r = n.breakpoints;
						if (r && (!r || 0 !== Object.keys(r).length)) {
							var s = e.getBreakpoint(r);
							if (s && e.currentBreakpoint !== s) {
								var o = s in r ? r[s] : void 0;
								o &&
									['slidesPerView', 'spaceBetween', 'slidesPerGroup'].forEach(
										function (e) {
											var t = o[e];
											void 0 !== t &&
												(o[e] =
													'slidesPerView' !== e ||
													('AUTO' !== t && 'auto' !== t)
														? 'slidesPerView' === e
															? parseFloat(t)
															: parseInt(t, 10)
														: 'auto');
										}
									);
								var l = o || e.originalParams,
									d = l.direction && l.direction !== n.direction,
									c = n.loop && (l.slidesPerView !== n.slidesPerView || d);
								d && a && e.changeDirection(),
									p.extend(e.params, l),
									p.extend(e, {
										allowTouchMove: e.params.allowTouchMove,
										allowSlideNext: e.params.allowSlideNext,
										allowSlidePrev: e.params.allowSlidePrev,
									}),
									(e.currentBreakpoint = s),
									c &&
										a &&
										(e.loopDestroy(),
										e.loopCreate(),
										e.updateSlides(),
										e.slideTo(t - i + e.loopedSlides, 0, !1)),
									e.emit('breakpoint', l);
							}
						}
					},
					getBreakpoint: function (e) {
						if (e) {
							var t = !1,
								a = [];
							Object.keys(e).forEach(function (e) {
								a.push(e);
							}),
								a.sort(function (e, t) {
									return parseInt(e, 10) - parseInt(t, 10);
								});
							for (var i = 0; i < a.length; i += 1) {
								var n = a[i];
								this.params.breakpointsInverse
									? n <= r.innerWidth && (t = n)
									: n >= r.innerWidth && !t && (t = n);
							}
							return t || 'max';
						}
					},
				},
				checkOverflow: {
					checkOverflow: function () {
						var e = this,
							t = e.isLocked;
						(e.isLocked = 1 === e.snapGrid.length),
							(e.allowSlideNext = !e.isLocked),
							(e.allowSlidePrev = !e.isLocked),
							t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock'),
							t && t !== e.isLocked && ((e.isEnd = !1), e.navigation.update());
					},
				},
				classes: {
					addClasses: function () {
						var e = this.classNames,
							t = this.params,
							a = this.rtl,
							i = this.$el,
							n = [];
						n.push('initialized'),
							n.push(t.direction),
							t.freeMode && n.push('free-mode'),
							h.flexbox || n.push('no-flexbox'),
							t.autoHeight && n.push('autoheight'),
							a && n.push('rtl'),
							1 < t.slidesPerColumn && n.push('multirow'),
							S.android && n.push('android'),
							S.ios && n.push('ios'),
							(f.isIE || f.isEdge) &&
								(h.pointerEvents || h.prefixedPointerEvents) &&
								n.push('wp8-' + t.direction),
							n.forEach(function (a) {
								e.push(t.containerModifierClass + a);
							}),
							i.addClass(e.join(' '));
					},
					removeClasses: function () {
						var e = this.$el,
							t = this.classNames;
						e.removeClass(t.join(' '));
					},
				},
				images: {
					loadImage: function (e, t, a, i, n, s) {
						function o() {
							s && s();
						}
						var l;
						e.complete && n
							? o()
							: t
							? (((l = new r.Image()).onload = o),
							  (l.onerror = o),
							  i && (l.sizes = i),
							  a && (l.srcset = a),
							  t && (l.src = t))
							: o();
					},
					preloadImages: function () {
						function e() {
							null != t &&
								t &&
								!t.destroyed &&
								(void 0 !== t.imagesLoaded && (t.imagesLoaded += 1),
								t.imagesLoaded === t.imagesToLoad.length &&
									(t.params.updateOnImagesReady && t.update(),
									t.emit('imagesReady')));
						}
						var t = this;
						t.imagesToLoad = t.$el.find('img');
						for (var a = 0; a < t.imagesToLoad.length; a += 1) {
							var i = t.imagesToLoad[a];
							t.loadImage(
								i,
								i.currentSrc || i.getAttribute('src'),
								i.srcset || i.getAttribute('srcset'),
								i.sizes || i.getAttribute('sizes'),
								!0,
								e
							);
						}
					},
				},
			},
			_ = {},
			M = (function (t) {
				function a() {
					for (var i, n, r, s = [], o = arguments.length; o--; )
						s[o] = arguments[o];
					(r =
						(r =
							1 === s.length && s[0].constructor && s[0].constructor === Object
								? s[0]
								: ((n = (i = s)[0]), i[1])) || {}),
						(r = p.extend({}, r)),
						n && !r.el && (r.el = n),
						t.call(this, r),
						Object.keys(C).forEach(function (e) {
							Object.keys(C[e]).forEach(function (t) {
								a.prototype[t] || (a.prototype[t] = C[e][t]);
							});
						});
					var l = this;
					void 0 === l.modules && (l.modules = {}),
						Object.keys(l.modules).forEach(function (e) {
							var t = l.modules[e];
							if (t.params) {
								var a = Object.keys(t.params)[0],
									i = t.params[a];
								if ('object' != typeof i || null === i) return;
								if (!(a in r) || !('enabled' in i)) return;
								!0 === r[a] && (r[a] = { enabled: !0 }),
									'object' != typeof r[a] ||
										'enabled' in r[a] ||
										(r[a].enabled = !0),
									r[a] || (r[a] = { enabled: !1 });
							}
						});
					var d = p.extend({}, T);
					l.useModulesParams(d),
						(l.params = p.extend({}, d, _, r)),
						(l.originalParams = p.extend({}, l.params)),
						(l.passedParams = p.extend({}, r));
					var c = (l.$ = e)(l.params.el);
					if ((n = c[0])) {
						if (1 < c.length) {
							var u = [];
							return (
								c.each(function (e, t) {
									var i = p.extend({}, r, { el: t });
									u.push(new a(i));
								}),
								u
							);
						}
						(n.swiper = l), c.data('swiper', l);
						var f,
							m,
							g = c.children('.' + l.params.wrapperClass);
						return (
							p.extend(l, {
								$el: c,
								el: n,
								$wrapperEl: g,
								wrapperEl: g[0],
								classNames: [],
								slides: e(),
								slidesGrid: [],
								snapGrid: [],
								slidesSizesGrid: [],
								isHorizontal: function () {
									return 'horizontal' === l.params.direction;
								},
								isVertical: function () {
									return 'vertical' === l.params.direction;
								},
								rtl:
									'rtl' === n.dir.toLowerCase() || 'rtl' === c.css('direction'),
								rtlTranslate:
									'horizontal' === l.params.direction &&
									('rtl' === n.dir.toLowerCase() ||
										'rtl' === c.css('direction')),
								wrongRTL: '-webkit-box' === g.css('display'),
								activeIndex: 0,
								realIndex: 0,
								isBeginning: !0,
								isEnd: !1,
								translate: 0,
								previousTranslate: 0,
								progress: 0,
								velocity: 0,
								animating: !1,
								allowSlideNext: l.params.allowSlideNext,
								allowSlidePrev: l.params.allowSlidePrev,
								touchEvents:
									((f = ['touchstart', 'touchmove', 'touchend']),
									(m = ['mousedown', 'mousemove', 'mouseup']),
									h.pointerEvents
										? (m = ['pointerdown', 'pointermove', 'pointerup'])
										: h.prefixedPointerEvents &&
										  (m = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp']),
									(l.touchEventsTouch = { start: f[0], move: f[1], end: f[2] }),
									(l.touchEventsDesktop = {
										start: m[0],
										move: m[1],
										end: m[2],
									}),
									h.touch || !l.params.simulateTouch
										? l.touchEventsTouch
										: l.touchEventsDesktop),
								touchEventsData: {
									isTouched: void 0,
									isMoved: void 0,
									allowTouchCallbacks: void 0,
									touchStartTime: void 0,
									isScrolling: void 0,
									currentTranslate: void 0,
									startTranslate: void 0,
									allowThresholdMove: void 0,
									formElements:
										'input, select, option, textarea, button, video',
									lastClickTime: p.now(),
									clickTimeout: void 0,
									velocities: [],
									allowMomentumBounce: void 0,
									isTouchEvent: void 0,
									startMoving: void 0,
								},
								allowClick: !0,
								allowTouchMove: l.params.allowTouchMove,
								touches: {
									startX: 0,
									startY: 0,
									currentX: 0,
									currentY: 0,
									diff: 0,
								},
								imagesToLoad: [],
								imagesLoaded: 0,
							}),
							l.useModules(),
							l.params.init && l.init(),
							l
						);
					}
				}
				t && (a.__proto__ = t);
				var i = {
					extendedDefaults: { configurable: !0 },
					defaults: { configurable: !0 },
					Class: { configurable: !0 },
					$: { configurable: !0 },
				};
				return (
					(((a.prototype = Object.create(
						t && t.prototype
					)).constructor = a).prototype.slidesPerViewDynamic = function () {
						var e = this,
							t = e.params,
							a = e.slides,
							i = e.slidesGrid,
							n = e.size,
							r = e.activeIndex,
							s = 1;
						if (t.centeredSlides) {
							for (
								var o, l = a[r].swiperSlideSize, d = r + 1;
								d < a.length;
								d += 1
							)
								a[d] &&
									!o &&
									((s += 1), n < (l += a[d].swiperSlideSize) && (o = !0));
							for (var c = r - 1; 0 <= c; c -= 1)
								a[c] &&
									!o &&
									((s += 1), n < (l += a[c].swiperSlideSize) && (o = !0));
						} else
							for (var u = r + 1; u < a.length; u += 1)
								i[u] - i[r] < n && (s += 1);
						return s;
					}),
					(a.prototype.update = function () {
						function e() {
							var e = t.rtlTranslate ? -1 * t.translate : t.translate,
								a = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
							t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses();
						}
						var t = this;
						if (t && !t.destroyed) {
							var a = t.snapGrid,
								i = t.params;
							i.breakpoints && t.setBreakpoint(),
								t.updateSize(),
								t.updateSlides(),
								t.updateProgress(),
								t.updateSlidesClasses(),
								t.params.freeMode
									? (e(), t.params.autoHeight && t.updateAutoHeight())
									: (('auto' === t.params.slidesPerView ||
											1 < t.params.slidesPerView) &&
									  t.isEnd &&
									  !t.params.centeredSlides
											? t.slideTo(t.slides.length - 1, 0, !1, !0)
											: t.slideTo(t.activeIndex, 0, !1, !0)) || e(),
								i.watchOverflow && a !== t.snapGrid && t.checkOverflow(),
								t.emit('update');
						}
					}),
					(a.prototype.changeDirection = function (e, t) {
						void 0 === t && (t = !0);
						var a = this,
							i = a.params.direction;
						return (
							(e = e || ('horizontal' === i ? 'vertical' : 'horizontal')) ===
								i ||
								('horizontal' !== e && 'vertical' !== e) ||
								(a.$el
									.removeClass(
										'' + a.params.containerModifierClass + i + ' wp8-' + i
									)
									.addClass('' + a.params.containerModifierClass + e),
								(f.isIE || f.isEdge) &&
									(h.pointerEvents || h.prefixedPointerEvents) &&
									a.$el.addClass(a.params.containerModifierClass + 'wp8-' + e),
								(a.params.direction = e),
								a.slides.each(function (t, a) {
									'vertical' === e
										? (a.style.width = '')
										: (a.style.height = '');
								}),
								a.emit('changeDirection'),
								t && a.update()),
							a
						);
					}),
					(a.prototype.init = function () {
						var e = this;
						e.initialized ||
							(e.emit('beforeInit'),
							e.params.breakpoints && e.setBreakpoint(),
							e.addClasses(),
							e.params.loop && e.loopCreate(),
							e.updateSize(),
							e.updateSlides(),
							e.params.watchOverflow && e.checkOverflow(),
							e.params.grabCursor && e.setGrabCursor(),
							e.params.preloadImages && e.preloadImages(),
							e.params.loop
								? e.slideTo(
										e.params.initialSlide + e.loopedSlides,
										0,
										e.params.runCallbacksOnInit
								  )
								: e.slideTo(
										e.params.initialSlide,
										0,
										e.params.runCallbacksOnInit
								  ),
							e.attachEvents(),
							(e.initialized = !0),
							e.emit('init'));
					}),
					(a.prototype.destroy = function (e, t) {
						void 0 === e && (e = !0), void 0 === t && (t = !0);
						var a = this,
							i = a.params,
							n = a.$el,
							r = a.$wrapperEl,
							s = a.slides;
						return (
							void 0 === a.params ||
								a.destroyed ||
								(a.emit('beforeDestroy'),
								(a.initialized = !1),
								a.detachEvents(),
								i.loop && a.loopDestroy(),
								t &&
									(a.removeClasses(),
									n.removeAttr('style'),
									r.removeAttr('style'),
									s &&
										s.length &&
										s
											.removeClass(
												[
													i.slideVisibleClass,
													i.slideActiveClass,
													i.slideNextClass,
													i.slidePrevClass,
												].join(' ')
											)
											.removeAttr('style')
											.removeAttr('data-swiper-slide-index')
											.removeAttr('data-swiper-column')
											.removeAttr('data-swiper-row')),
								a.emit('destroy'),
								Object.keys(a.eventsListeners).forEach(function (e) {
									a.off(e);
								}),
								!1 !== e &&
									((a.$el[0].swiper = null),
									a.$el.data('swiper', null),
									p.deleteProps(a)),
								(a.destroyed = !0)),
							null
						);
					}),
					(a.extendDefaults = function (e) {
						p.extend(_, e);
					}),
					(i.extendedDefaults.get = function () {
						return _;
					}),
					(i.defaults.get = function () {
						return T;
					}),
					(i.Class.get = function () {
						return t;
					}),
					(i.$.get = function () {
						return e;
					}),
					Object.defineProperties(a, i),
					a
				);
			})(a),
			k = { name: 'device', proto: { device: S }, static: { device: S } },
			O = { name: 'support', proto: { support: h }, static: { support: h } },
			N = { name: 'browser', proto: { browser: f }, static: { browser: f } },
			P = {
				name: 'resize',
				create: function () {
					var e = this;
					p.extend(e, {
						resize: {
							resizeHandler: function () {
								e &&
									!e.destroyed &&
									e.initialized &&
									(e.emit('beforeResize'), e.emit('resize'));
							},
							orientationChangeHandler: function () {
								e &&
									!e.destroyed &&
									e.initialized &&
									e.emit('orientationchange');
							},
						},
					});
				},
				on: {
					init: function () {
						r.addEventListener('resize', this.resize.resizeHandler),
							r.addEventListener(
								'orientationchange',
								this.resize.orientationChangeHandler
							);
					},
					destroy: function () {
						r.removeEventListener('resize', this.resize.resizeHandler),
							r.removeEventListener(
								'orientationchange',
								this.resize.orientationChangeHandler
							);
					},
				},
			},
			I = {
				func: r.MutationObserver || r.WebkitMutationObserver,
				attach: function (e, t) {
					void 0 === t && (t = {});
					var a = this,
						i = new I.func(function (e) {
							if (1 !== e.length) {
								var t = function () {
									a.emit('observerUpdate', e[0]);
								};
								r.requestAnimationFrame
									? r.requestAnimationFrame(t)
									: r.setTimeout(t, 0);
							} else a.emit('observerUpdate', e[0]);
						});
					i.observe(e, {
						attributes: void 0 === t.attributes || t.attributes,
						childList: void 0 === t.childList || t.childList,
						characterData: void 0 === t.characterData || t.characterData,
					}),
						a.observer.observers.push(i);
				},
				init: function () {
					var e = this;
					if (h.observer && e.params.observer) {
						if (e.params.observeParents)
							for (var t = e.$el.parents(), a = 0; a < t.length; a += 1)
								e.observer.attach(t[a]);
						e.observer.attach(e.$el[0], {
							childList: e.params.observeSlideChildren,
						}),
							e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
					}
				},
				destroy: function () {
					this.observer.observers.forEach(function (e) {
						e.disconnect();
					}),
						(this.observer.observers = []);
				},
			},
			L = {
				name: 'observer',
				params: { observer: !1, observeParents: !1, observeSlideChildren: !1 },
				create: function () {
					p.extend(this, {
						observer: {
							init: I.init.bind(this),
							attach: I.attach.bind(this),
							destroy: I.destroy.bind(this),
							observers: [],
						},
					});
				},
				on: {
					init: function () {
						this.observer.init();
					},
					destroy: function () {
						this.observer.destroy();
					},
				},
			},
			A = {
				update: function (e) {
					function t() {
						a.updateSlides(),
							a.updateProgress(),
							a.updateSlidesClasses(),
							a.lazy && a.params.lazy.enabled && a.lazy.load();
					}
					var a = this,
						i = a.params,
						n = i.slidesPerView,
						r = i.slidesPerGroup,
						s = i.centeredSlides,
						o = a.params.virtual,
						l = o.addSlidesBefore,
						d = o.addSlidesAfter,
						c = a.virtual,
						u = c.from,
						h = c.to,
						f = c.slides,
						m = c.slidesGrid,
						g = c.renderSlide,
						v = c.offset;
					a.updateActiveIndex();
					var b,
						y,
						w,
						E = a.activeIndex || 0;
					(b = a.rtlTranslate ? 'right' : a.isHorizontal() ? 'left' : 'top'),
						(w = s
							? ((y = Math.floor(n / 2) + r + l), Math.floor(n / 2) + r + d)
							: ((y = n + (r - 1) + l), r + d));
					var x = Math.max((E || 0) - w, 0),
						S = Math.min((E || 0) + y, f.length - 1),
						T = (a.slidesGrid[x] || 0) - (a.slidesGrid[0] || 0);
					if (
						(p.extend(a.virtual, {
							from: x,
							to: S,
							offset: T,
							slidesGrid: a.slidesGrid,
						}),
						u === x && h === S && !e)
					)
						return (
							a.slidesGrid !== m && T !== v && a.slides.css(b, T + 'px'),
							void a.updateProgress()
						);
					if (a.params.virtual.renderExternal)
						return (
							a.params.virtual.renderExternal.call(a, {
								offset: T,
								from: x,
								to: S,
								slides: (function () {
									for (var e = [], t = x; t <= S; t += 1) e.push(f[t]);
									return e;
								})(),
							}),
							void t()
						);
					var C = [],
						_ = [];
					if (e) a.$wrapperEl.find('.' + a.params.slideClass).remove();
					else
						for (var M = u; M <= h; M += 1)
							(M < x || S < M) &&
								a.$wrapperEl
									.find(
										'.' +
											a.params.slideClass +
											'[data-swiper-slide-index="' +
											M +
											'"]'
									)
									.remove();
					for (var k = 0; k < f.length; k += 1)
						x <= k &&
							k <= S &&
							(void 0 === h || e
								? _.push(k)
								: (h < k && _.push(k), k < u && C.push(k)));
					_.forEach(function (e) {
						a.$wrapperEl.append(g(f[e], e));
					}),
						C.sort(function (e, t) {
							return t - e;
						}).forEach(function (e) {
							a.$wrapperEl.prepend(g(f[e], e));
						}),
						a.$wrapperEl.children('.swiper-slide').css(b, T + 'px'),
						t();
				},
				renderSlide: function (t, a) {
					var i = this,
						n = i.params.virtual;
					if (n.cache && i.virtual.cache[a]) return i.virtual.cache[a];
					var r = n.renderSlide
						? e(n.renderSlide.call(i, t, a))
						: e(
								'<div class="' +
									i.params.slideClass +
									'" data-swiper-slide-index="' +
									a +
									'">' +
									t +
									'</div>'
						  );
					return (
						r.attr('data-swiper-slide-index') ||
							r.attr('data-swiper-slide-index', a),
						n.cache && (i.virtual.cache[a] = r),
						r
					);
				},
				appendSlide: function (e) {
					if ('object' == typeof e && 'length' in e)
						for (var t = 0; t < e.length; t += 1)
							e[t] && this.virtual.slides.push(e[t]);
					else this.virtual.slides.push(e);
					this.virtual.update(!0);
				},
				prependSlide: function (e) {
					var t = this,
						a = t.activeIndex,
						i = a + 1,
						n = 1;
					if (Array.isArray(e)) {
						for (var r = 0; r < e.length; r += 1)
							e[r] && t.virtual.slides.unshift(e[r]);
						(i = a + e.length), (n = e.length);
					} else t.virtual.slides.unshift(e);
					if (t.params.virtual.cache) {
						var s = t.virtual.cache,
							o = {};
						Object.keys(s).forEach(function (e) {
							o[parseInt(e, 10) + n] = s[e];
						}),
							(t.virtual.cache = o);
					}
					t.virtual.update(!0), t.slideTo(i, 0);
				},
				removeSlide: function (e) {
					var t = this;
					if (null != e) {
						var a = t.activeIndex;
						if (Array.isArray(e))
							for (var i = e.length - 1; 0 <= i; i -= 1)
								t.virtual.slides.splice(e[i], 1),
									t.params.virtual.cache && delete t.virtual.cache[e[i]],
									e[i] < a && (a -= 1),
									(a = Math.max(a, 0));
						else
							t.virtual.slides.splice(e, 1),
								t.params.virtual.cache && delete t.virtual.cache[e],
								e < a && (a -= 1),
								(a = Math.max(a, 0));
						t.virtual.update(!0), t.slideTo(a, 0);
					}
				},
				removeAllSlides: function () {
					var e = this;
					(e.virtual.slides = []),
						e.params.virtual.cache && (e.virtual.cache = {}),
						e.virtual.update(!0),
						e.slideTo(0, 0);
				},
			},
			D = {
				name: 'virtual',
				params: {
					virtual: {
						enabled: !1,
						slides: [],
						cache: !0,
						renderSlide: null,
						renderExternal: null,
						addSlidesBefore: 0,
						addSlidesAfter: 0,
					},
				},
				create: function () {
					var e = this;
					p.extend(e, {
						virtual: {
							update: A.update.bind(e),
							appendSlide: A.appendSlide.bind(e),
							prependSlide: A.prependSlide.bind(e),
							removeSlide: A.removeSlide.bind(e),
							removeAllSlides: A.removeAllSlides.bind(e),
							renderSlide: A.renderSlide.bind(e),
							slides: e.params.virtual.slides,
							cache: {},
						},
					});
				},
				on: {
					beforeInit: function () {
						var e = this;
						if (e.params.virtual.enabled) {
							e.classNames.push(e.params.containerModifierClass + 'virtual');
							var t = { watchSlidesProgress: !0 };
							p.extend(e.params, t),
								p.extend(e.originalParams, t),
								e.params.initialSlide || e.virtual.update();
						}
					},
					setTranslate: function () {
						this.params.virtual.enabled && this.virtual.update();
					},
				},
			},
			z = {
				handle: function (e) {
					var t = this,
						a = t.rtlTranslate,
						i = e;
					i.originalEvent && (i = i.originalEvent);
					var s = i.keyCode || i.charCode;
					if (
						!t.allowSlideNext &&
						((t.isHorizontal() && 39 === s) ||
							(t.isVertical() && 40 === s) ||
							34 === s)
					)
						return !1;
					if (
						!t.allowSlidePrev &&
						((t.isHorizontal() && 37 === s) ||
							(t.isVertical() && 38 === s) ||
							33 === s)
					)
						return !1;
					if (
						!(
							i.shiftKey ||
							i.altKey ||
							i.ctrlKey ||
							i.metaKey ||
							(n.activeElement &&
								n.activeElement.nodeName &&
								('input' === n.activeElement.nodeName.toLowerCase() ||
									'textarea' === n.activeElement.nodeName.toLowerCase()))
						)
					) {
						if (
							t.params.keyboard.onlyInViewport &&
							(33 === s ||
								34 === s ||
								37 === s ||
								39 === s ||
								38 === s ||
								40 === s)
						) {
							var o = !1;
							if (
								0 < t.$el.parents('.' + t.params.slideClass).length &&
								0 === t.$el.parents('.' + t.params.slideActiveClass).length
							)
								return;
							var l = r.innerWidth,
								d = r.innerHeight,
								c = t.$el.offset();
							a && (c.left -= t.$el[0].scrollLeft);
							for (
								var u = [
										[c.left, c.top],
										[c.left + t.width, c.top],
										[c.left, c.top + t.height],
										[c.left + t.width, c.top + t.height],
									],
									p = 0;
								p < u.length;
								p += 1
							) {
								var h = u[p];
								0 <= h[0] && h[0] <= l && 0 <= h[1] && h[1] <= d && (o = !0);
							}
							if (!o) return;
						}
						t.isHorizontal()
							? ((33 !== s && 34 !== s && 37 !== s && 39 !== s) ||
									(i.preventDefault
										? i.preventDefault()
										: (i.returnValue = !1)),
							  (((34 !== s && 39 !== s) || a) &&
									((33 !== s && 37 !== s) || !a)) ||
									t.slideNext(),
							  (((33 !== s && 37 !== s) || a) &&
									((34 !== s && 39 !== s) || !a)) ||
									t.slidePrev())
							: ((33 !== s && 34 !== s && 38 !== s && 40 !== s) ||
									(i.preventDefault
										? i.preventDefault()
										: (i.returnValue = !1)),
							  (34 !== s && 40 !== s) || t.slideNext(),
							  (33 !== s && 38 !== s) || t.slidePrev()),
							t.emit('keyPress', s);
					}
				},
				enable: function () {
					this.keyboard.enabled ||
						(e(n).on('keydown', this.keyboard.handle),
						(this.keyboard.enabled = !0));
				},
				disable: function () {
					this.keyboard.enabled &&
						(e(n).off('keydown', this.keyboard.handle),
						(this.keyboard.enabled = !1));
				},
			},
			R = {
				name: 'keyboard',
				params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
				create: function () {
					p.extend(this, {
						keyboard: {
							enabled: !1,
							enable: z.enable.bind(this),
							disable: z.disable.bind(this),
							handle: z.handle.bind(this),
						},
					});
				},
				on: {
					init: function () {
						this.params.keyboard.enabled && this.keyboard.enable();
					},
					destroy: function () {
						this.keyboard.enabled && this.keyboard.disable();
					},
				},
			},
			$ = {
				lastScrollTime: p.now(),
				event:
					-1 < r.navigator.userAgent.indexOf('firefox')
						? 'DOMMouseScroll'
						: (function () {
								var e = 'onwheel',
									t = e in n;
								if (!t) {
									var a = n.createElement('div');
									a.setAttribute(e, 'return;'), (t = 'function' == typeof a[e]);
								}
								return (
									!t &&
										n.implementation &&
										n.implementation.hasFeature &&
										!0 !== n.implementation.hasFeature('', '') &&
										(t = n.implementation.hasFeature('Events.wheel', '3.0')),
									t
								);
						  })()
						? 'wheel'
						: 'mousewheel',
				normalize: function (e) {
					var t = 0,
						a = 0,
						i = 0,
						n = 0;
					return (
						'detail' in e && (a = e.detail),
						'wheelDelta' in e && (a = -e.wheelDelta / 120),
						'wheelDeltaY' in e && (a = -e.wheelDeltaY / 120),
						'wheelDeltaX' in e && (t = -e.wheelDeltaX / 120),
						'axis' in e && e.axis === e.HORIZONTAL_AXIS && ((t = a), (a = 0)),
						(i = 10 * t),
						(n = 10 * a),
						'deltaY' in e && (n = e.deltaY),
						'deltaX' in e && (i = e.deltaX),
						(i || n) &&
							e.deltaMode &&
							(1 === e.deltaMode
								? ((i *= 40), (n *= 40))
								: ((i *= 800), (n *= 800))),
						i && !t && (t = i < 1 ? -1 : 1),
						n && !a && (a = n < 1 ? -1 : 1),
						{ spinX: t, spinY: a, pixelX: i, pixelY: n }
					);
				},
				handleMouseEnter: function () {
					this.mouseEntered = !0;
				},
				handleMouseLeave: function () {
					this.mouseEntered = !1;
				},
				handle: function (e) {
					var t = e,
						a = this,
						i = a.params.mousewheel;
					if (!a.mouseEntered && !i.releaseOnEdges) return !0;
					t.originalEvent && (t = t.originalEvent);
					var n = 0,
						s = a.rtlTranslate ? -1 : 1,
						o = $.normalize(t);
					if (i.forceToAxis)
						if (a.isHorizontal()) {
							if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
							n = o.pixelX * s;
						} else {
							if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
							n = o.pixelY;
						}
					else
						n =
							Math.abs(o.pixelX) > Math.abs(o.pixelY)
								? -o.pixelX * s
								: -o.pixelY;
					if (0 === n) return !0;
					if ((i.invert && (n = -n), a.params.freeMode)) {
						a.params.loop && a.loopFix();
						var l = a.getTranslate() + n * i.sensitivity,
							d = a.isBeginning,
							c = a.isEnd;
						if (
							(l >= a.minTranslate() && (l = a.minTranslate()),
							l <= a.maxTranslate() && (l = a.maxTranslate()),
							a.setTransition(0),
							a.setTranslate(l),
							a.updateProgress(),
							a.updateActiveIndex(),
							a.updateSlidesClasses(),
							((!d && a.isBeginning) || (!c && a.isEnd)) &&
								a.updateSlidesClasses(),
							a.params.freeModeSticky &&
								(clearTimeout(a.mousewheel.timeout),
								(a.mousewheel.timeout = p.nextTick(function () {
									a.slideToClosest();
								}, 300))),
							a.emit('scroll', t),
							a.params.autoplay &&
								a.params.autoplayDisableOnInteraction &&
								a.autoplay.stop(),
							l === a.minTranslate() || l === a.maxTranslate())
						)
							return !0;
					} else {
						if (60 < p.now() - a.mousewheel.lastScrollTime)
							if (n < 0)
								if ((a.isEnd && !a.params.loop) || a.animating) {
									if (i.releaseOnEdges) return !0;
								} else a.slideNext(), a.emit('scroll', t);
							else if ((a.isBeginning && !a.params.loop) || a.animating) {
								if (i.releaseOnEdges) return !0;
							} else a.slidePrev(), a.emit('scroll', t);
						a.mousewheel.lastScrollTime = new r.Date().getTime();
					}
					return (
						t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1
					);
				},
				enable: function () {
					var t = this;
					if (!$.event) return !1;
					if (t.mousewheel.enabled) return !1;
					var a = t.$el;
					return (
						'container' !== t.params.mousewheel.eventsTarged &&
							(a = e(t.params.mousewheel.eventsTarged)),
						a.on('mouseenter', t.mousewheel.handleMouseEnter),
						a.on('mouseleave', t.mousewheel.handleMouseLeave),
						a.on($.event, t.mousewheel.handle),
						(t.mousewheel.enabled = !0)
					);
				},
				disable: function () {
					var t = this;
					if (!$.event) return !1;
					if (!t.mousewheel.enabled) return !1;
					var a = t.$el;
					return (
						'container' !== t.params.mousewheel.eventsTarged &&
							(a = e(t.params.mousewheel.eventsTarged)),
						a.off($.event, t.mousewheel.handle),
						!(t.mousewheel.enabled = !1)
					);
				},
			},
			B = {
				update: function () {
					var e = this,
						t = e.params.navigation;
					if (!e.params.loop) {
						var a = e.navigation,
							i = a.$nextEl,
							n = a.$prevEl;
						n &&
							0 < n.length &&
							(e.isBeginning
								? n.addClass(t.disabledClass)
								: n.removeClass(t.disabledClass),
							n[
								e.params.watchOverflow && e.isLocked
									? 'addClass'
									: 'removeClass'
							](t.lockClass)),
							i &&
								0 < i.length &&
								(e.isEnd
									? i.addClass(t.disabledClass)
									: i.removeClass(t.disabledClass),
								i[
									e.params.watchOverflow && e.isLocked
										? 'addClass'
										: 'removeClass'
								](t.lockClass));
					}
				},
				onPrevClick: function (e) {
					e.preventDefault(),
						(this.isBeginning && !this.params.loop) || this.slidePrev();
				},
				onNextClick: function (e) {
					e.preventDefault(),
						(this.isEnd && !this.params.loop) || this.slideNext();
				},
				init: function () {
					var t,
						a,
						i = this,
						n = i.params.navigation;
					(n.nextEl || n.prevEl) &&
						(n.nextEl &&
							((t = e(n.nextEl)),
							i.params.uniqueNavElements &&
								'string' == typeof n.nextEl &&
								1 < t.length &&
								1 === i.$el.find(n.nextEl).length &&
								(t = i.$el.find(n.nextEl))),
						n.prevEl &&
							((a = e(n.prevEl)),
							i.params.uniqueNavElements &&
								'string' == typeof n.prevEl &&
								1 < a.length &&
								1 === i.$el.find(n.prevEl).length &&
								(a = i.$el.find(n.prevEl))),
						t && 0 < t.length && t.on('click', i.navigation.onNextClick),
						a && 0 < a.length && a.on('click', i.navigation.onPrevClick),
						p.extend(i.navigation, {
							$nextEl: t,
							nextEl: t && t[0],
							$prevEl: a,
							prevEl: a && a[0],
						}));
				},
				destroy: function () {
					var e = this,
						t = e.navigation,
						a = t.$nextEl,
						i = t.$prevEl;
					a &&
						a.length &&
						(a.off('click', e.navigation.onNextClick),
						a.removeClass(e.params.navigation.disabledClass)),
						i &&
							i.length &&
							(i.off('click', e.navigation.onPrevClick),
							i.removeClass(e.params.navigation.disabledClass));
				},
			},
			H = {
				update: function () {
					var t = this,
						a = t.rtl,
						i = t.params.pagination;
					if (
						i.el &&
						t.pagination.el &&
						t.pagination.$el &&
						0 !== t.pagination.$el.length
					) {
						var n,
							r =
								t.virtual && t.params.virtual.enabled
									? t.virtual.slides.length
									: t.slides.length,
							s = t.pagination.$el,
							o = t.params.loop
								? Math.ceil((r - 2 * t.loopedSlides) / t.params.slidesPerGroup)
								: t.snapGrid.length;
						if (
							(t.params.loop
								? ((n = Math.ceil(
										(t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
								  )) >
										r - 1 - 2 * t.loopedSlides && (n -= r - 2 * t.loopedSlides),
								  o - 1 < n && (n -= o),
								  n < 0 && 'bullets' !== t.params.paginationType && (n = o + n))
								: (n =
										void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
							'bullets' === i.type &&
								t.pagination.bullets &&
								0 < t.pagination.bullets.length)
						) {
							var l,
								d,
								c,
								u = t.pagination.bullets;
							if (
								(i.dynamicBullets &&
									((t.pagination.bulletSize = u
										.eq(0)
										[t.isHorizontal() ? 'outerWidth' : 'outerHeight'](!0)),
									s.css(
										t.isHorizontal() ? 'width' : 'height',
										t.pagination.bulletSize * (i.dynamicMainBullets + 4) + 'px'
									),
									1 < i.dynamicMainBullets &&
										void 0 !== t.previousIndex &&
										((t.pagination.dynamicBulletIndex += n - t.previousIndex),
										t.pagination.dynamicBulletIndex > i.dynamicMainBullets - 1
											? (t.pagination.dynamicBulletIndex =
													i.dynamicMainBullets - 1)
											: t.pagination.dynamicBulletIndex < 0 &&
											  (t.pagination.dynamicBulletIndex = 0)),
									(l = n - t.pagination.dynamicBulletIndex),
									(c =
										((d = l + (Math.min(u.length, i.dynamicMainBullets) - 1)) +
											l) /
										2)),
								u.removeClass(
									i.bulletActiveClass +
										' ' +
										i.bulletActiveClass +
										'-next ' +
										i.bulletActiveClass +
										'-next-next ' +
										i.bulletActiveClass +
										'-prev ' +
										i.bulletActiveClass +
										'-prev-prev ' +
										i.bulletActiveClass +
										'-main'
								),
								1 < s.length)
							)
								u.each(function (t, a) {
									var r = e(a),
										s = r.index();
									s === n && r.addClass(i.bulletActiveClass),
										i.dynamicBullets &&
											(l <= s &&
												s <= d &&
												r.addClass(i.bulletActiveClass + '-main'),
											s === l &&
												r
													.prev()
													.addClass(i.bulletActiveClass + '-prev')
													.prev()
													.addClass(i.bulletActiveClass + '-prev-prev'),
											s === d &&
												r
													.next()
													.addClass(i.bulletActiveClass + '-next')
													.next()
													.addClass(i.bulletActiveClass + '-next-next'));
								});
							else if (
								(u.eq(n).addClass(i.bulletActiveClass), i.dynamicBullets)
							) {
								for (var p = u.eq(l), h = u.eq(d), f = l; f <= d; f += 1)
									u.eq(f).addClass(i.bulletActiveClass + '-main');
								p
									.prev()
									.addClass(i.bulletActiveClass + '-prev')
									.prev()
									.addClass(i.bulletActiveClass + '-prev-prev'),
									h
										.next()
										.addClass(i.bulletActiveClass + '-next')
										.next()
										.addClass(i.bulletActiveClass + '-next-next');
							}
							if (i.dynamicBullets) {
								var m = Math.min(u.length, i.dynamicMainBullets + 4),
									g =
										(t.pagination.bulletSize * m - t.pagination.bulletSize) /
											2 -
										c * t.pagination.bulletSize,
									v = a ? 'right' : 'left';
								u.css(t.isHorizontal() ? v : 'top', g + 'px');
							}
						}
						if (
							('fraction' === i.type &&
								(s
									.find('.' + i.currentClass)
									.text(i.formatFractionCurrent(n + 1)),
								s.find('.' + i.totalClass).text(i.formatFractionTotal(o))),
							'progressbar' === i.type)
						) {
							var b;
							b = i.progressbarOpposite
								? t.isHorizontal()
									? 'vertical'
									: 'horizontal'
								: t.isHorizontal()
								? 'horizontal'
								: 'vertical';
							var y = (n + 1) / o,
								w = 1,
								E = 1;
							'horizontal' === b ? (w = y) : (E = y),
								s
									.find('.' + i.progressbarFillClass)
									.transform(
										'translate3d(0,0,0) scaleX(' + w + ') scaleY(' + E + ')'
									)
									.transition(t.params.speed);
						}
						'custom' === i.type && i.renderCustom
							? (s.html(i.renderCustom(t, n + 1, o)),
							  t.emit('paginationRender', t, s[0]))
							: t.emit('paginationUpdate', t, s[0]),
							s[
								t.params.watchOverflow && t.isLocked
									? 'addClass'
									: 'removeClass'
							](i.lockClass);
					}
				},
				render: function () {
					var e = this,
						t = e.params.pagination;
					if (
						t.el &&
						e.pagination.el &&
						e.pagination.$el &&
						0 !== e.pagination.$el.length
					) {
						var a =
								e.virtual && e.params.virtual.enabled
									? e.virtual.slides.length
									: e.slides.length,
							i = e.pagination.$el,
							n = '';
						if ('bullets' === t.type) {
							for (
								var r = e.params.loop
										? Math.ceil(
												(a - 2 * e.loopedSlides) / e.params.slidesPerGroup
										  )
										: e.snapGrid.length,
									s = 0;
								s < r;
								s += 1
							)
								t.renderBullet
									? (n += t.renderBullet.call(e, s, t.bulletClass))
									: (n +=
											'<' +
											t.bulletElement +
											' class="' +
											t.bulletClass +
											'"></' +
											t.bulletElement +
											'>');
							i.html(n), (e.pagination.bullets = i.find('.' + t.bulletClass));
						}
						'fraction' === t.type &&
							((n = t.renderFraction
								? t.renderFraction.call(e, t.currentClass, t.totalClass)
								: '<span class="' +
								  t.currentClass +
								  '"></span> / <span class="' +
								  t.totalClass +
								  '"></span>'),
							i.html(n)),
							'progressbar' === t.type &&
								((n = t.renderProgressbar
									? t.renderProgressbar.call(e, t.progressbarFillClass)
									: '<span class="' + t.progressbarFillClass + '"></span>'),
								i.html(n)),
							'custom' !== t.type &&
								e.emit('paginationRender', e.pagination.$el[0]);
					}
				},
				init: function () {
					var t = this,
						a = t.params.pagination;
					if (a.el) {
						var i = e(a.el);
						0 !== i.length &&
							(t.params.uniqueNavElements &&
								'string' == typeof a.el &&
								1 < i.length &&
								1 === t.$el.find(a.el).length &&
								(i = t.$el.find(a.el)),
							'bullets' === a.type &&
								a.clickable &&
								i.addClass(a.clickableClass),
							i.addClass(a.modifierClass + a.type),
							'bullets' === a.type &&
								a.dynamicBullets &&
								(i.addClass('' + a.modifierClass + a.type + '-dynamic'),
								(t.pagination.dynamicBulletIndex = 0),
								a.dynamicMainBullets < 1 && (a.dynamicMainBullets = 1)),
							'progressbar' === a.type &&
								a.progressbarOpposite &&
								i.addClass(a.progressbarOppositeClass),
							a.clickable &&
								i.on('click', '.' + a.bulletClass, function (a) {
									a.preventDefault();
									var i = e(this).index() * t.params.slidesPerGroup;
									t.params.loop && (i += t.loopedSlides), t.slideTo(i);
								}),
							p.extend(t.pagination, { $el: i, el: i[0] }));
					}
				},
				destroy: function () {
					var e = this,
						t = e.params.pagination;
					if (
						t.el &&
						e.pagination.el &&
						e.pagination.$el &&
						0 !== e.pagination.$el.length
					) {
						var a = e.pagination.$el;
						a.removeClass(t.hiddenClass),
							a.removeClass(t.modifierClass + t.type),
							e.pagination.bullets &&
								e.pagination.bullets.removeClass(t.bulletActiveClass),
							t.clickable && a.off('click', '.' + t.bulletClass);
					}
				},
			},
			j = {
				setTranslate: function () {
					var e = this;
					if (e.params.scrollbar.el && e.scrollbar.el) {
						var t = e.scrollbar,
							a = e.rtlTranslate,
							i = e.progress,
							n = t.dragSize,
							r = t.trackSize,
							s = t.$dragEl,
							o = t.$el,
							l = e.params.scrollbar,
							d = n,
							c = (r - n) * i;
						a
							? 0 < (c = -c)
								? ((d = n - c), (c = 0))
								: r < -c + n && (d = r + c)
							: c < 0
							? ((d = n + c), (c = 0))
							: r < c + n && (d = r - c),
							e.isHorizontal()
								? (h.transforms3d
										? s.transform('translate3d(' + c + 'px, 0, 0)')
										: s.transform('translateX(' + c + 'px)'),
								  (s[0].style.width = d + 'px'))
								: (h.transforms3d
										? s.transform('translate3d(0px, ' + c + 'px, 0)')
										: s.transform('translateY(' + c + 'px)'),
								  (s[0].style.height = d + 'px')),
							l.hide &&
								(clearTimeout(e.scrollbar.timeout),
								(o[0].style.opacity = 1),
								(e.scrollbar.timeout = setTimeout(function () {
									(o[0].style.opacity = 0), o.transition(400);
								}, 1e3)));
					}
				},
				setTransition: function (e) {
					this.params.scrollbar.el &&
						this.scrollbar.el &&
						this.scrollbar.$dragEl.transition(e);
				},
				updateSize: function () {
					var e = this;
					if (e.params.scrollbar.el && e.scrollbar.el) {
						var t = e.scrollbar,
							a = t.$dragEl,
							i = t.$el;
						(a[0].style.width = ''), (a[0].style.height = '');
						var n,
							r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
							s = e.size / e.virtualSize,
							o = s * (r / e.size);
						(n =
							'auto' === e.params.scrollbar.dragSize
								? r * s
								: parseInt(e.params.scrollbar.dragSize, 10)),
							e.isHorizontal()
								? (a[0].style.width = n + 'px')
								: (a[0].style.height = n + 'px'),
							(i[0].style.display = 1 <= s ? 'none' : ''),
							e.params.scrollbar.hide && (i[0].style.opacity = 0),
							p.extend(t, {
								trackSize: r,
								divider: s,
								moveDivider: o,
								dragSize: n,
							}),
							t.$el[
								e.params.watchOverflow && e.isLocked
									? 'addClass'
									: 'removeClass'
							](e.params.scrollbar.lockClass);
					}
				},
				getPointerPosition: function (e) {
					return this.isHorizontal()
						? 'touchstart' === e.type || 'touchmove' === e.type
							? e.targetTouches[0].pageX
							: e.pageX || e.clientX
						: 'touchstart' === e.type || 'touchmove' === e.type
						? e.targetTouches[0].pageY
						: e.pageY || e.clientY;
				},
				setDragPosition: function (e) {
					var t,
						a = this,
						i = a.scrollbar,
						n = a.rtlTranslate,
						r = i.$el,
						s = i.dragSize,
						o = i.trackSize,
						l = i.dragStartPos;
					(t =
						(i.getPointerPosition(e) -
							r.offset()[a.isHorizontal() ? 'left' : 'top'] -
							(null !== l ? l : s / 2)) /
						(o - s)),
						(t = Math.max(Math.min(t, 1), 0)),
						n && (t = 1 - t);
					var d = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
					a.updateProgress(d),
						a.setTranslate(d),
						a.updateActiveIndex(),
						a.updateSlidesClasses();
				},
				onDragStart: function (e) {
					var t = this,
						a = t.params.scrollbar,
						i = t.scrollbar,
						n = t.$wrapperEl,
						r = i.$el,
						s = i.$dragEl;
					(t.scrollbar.isTouched = !0),
						(t.scrollbar.dragStartPos =
							e.target === s[0] || e.target === s
								? i.getPointerPosition(e) -
								  e.target.getBoundingClientRect()[
										t.isHorizontal() ? 'left' : 'top'
								  ]
								: null),
						e.preventDefault(),
						e.stopPropagation(),
						n.transition(100),
						s.transition(100),
						i.setDragPosition(e),
						clearTimeout(t.scrollbar.dragTimeout),
						r.transition(0),
						a.hide && r.css('opacity', 1),
						t.emit('scrollbarDragStart', e);
				},
				onDragMove: function (e) {
					var t = this.scrollbar,
						a = this.$wrapperEl,
						i = t.$el,
						n = t.$dragEl;
					this.scrollbar.isTouched &&
						(e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
						t.setDragPosition(e),
						a.transition(0),
						i.transition(0),
						n.transition(0),
						this.emit('scrollbarDragMove', e));
				},
				onDragEnd: function (e) {
					var t = this,
						a = t.params.scrollbar,
						i = t.scrollbar.$el;
					t.scrollbar.isTouched &&
						((t.scrollbar.isTouched = !1),
						a.hide &&
							(clearTimeout(t.scrollbar.dragTimeout),
							(t.scrollbar.dragTimeout = p.nextTick(function () {
								i.css('opacity', 0), i.transition(400);
							}, 1e3))),
						t.emit('scrollbarDragEnd', e),
						a.snapOnRelease && t.slideToClosest());
				},
				enableDraggable: function () {
					var e = this;
					if (e.params.scrollbar.el) {
						var t = e.scrollbar,
							a = e.touchEventsTouch,
							i = e.touchEventsDesktop,
							r = e.params,
							s = t.$el[0],
							o = !(!h.passiveListener || !r.passiveListeners) && {
								passive: !1,
								capture: !1,
							},
							l = !(!h.passiveListener || !r.passiveListeners) && {
								passive: !0,
								capture: !1,
							};
						h.touch
							? (s.addEventListener(a.start, e.scrollbar.onDragStart, o),
							  s.addEventListener(a.move, e.scrollbar.onDragMove, o),
							  s.addEventListener(a.end, e.scrollbar.onDragEnd, l))
							: (s.addEventListener(i.start, e.scrollbar.onDragStart, o),
							  n.addEventListener(i.move, e.scrollbar.onDragMove, o),
							  n.addEventListener(i.end, e.scrollbar.onDragEnd, l));
					}
				},
				disableDraggable: function () {
					var e = this;
					if (e.params.scrollbar.el) {
						var t = e.scrollbar,
							a = e.touchEventsTouch,
							i = e.touchEventsDesktop,
							r = e.params,
							s = t.$el[0],
							o = !(!h.passiveListener || !r.passiveListeners) && {
								passive: !1,
								capture: !1,
							},
							l = !(!h.passiveListener || !r.passiveListeners) && {
								passive: !0,
								capture: !1,
							};
						h.touch
							? (s.removeEventListener(a.start, e.scrollbar.onDragStart, o),
							  s.removeEventListener(a.move, e.scrollbar.onDragMove, o),
							  s.removeEventListener(a.end, e.scrollbar.onDragEnd, l))
							: (s.removeEventListener(i.start, e.scrollbar.onDragStart, o),
							  n.removeEventListener(i.move, e.scrollbar.onDragMove, o),
							  n.removeEventListener(i.end, e.scrollbar.onDragEnd, l));
					}
				},
				init: function () {
					var t = this;
					if (t.params.scrollbar.el) {
						var a = t.scrollbar,
							i = t.$el,
							n = t.params.scrollbar,
							r = e(n.el);
						t.params.uniqueNavElements &&
							'string' == typeof n.el &&
							1 < r.length &&
							1 === i.find(n.el).length &&
							(r = i.find(n.el));
						var s = r.find('.' + t.params.scrollbar.dragClass);
						0 === s.length &&
							((s = e(
								'<div class="' + t.params.scrollbar.dragClass + '"></div>'
							)),
							r.append(s)),
							p.extend(a, { $el: r, el: r[0], $dragEl: s, dragEl: s[0] }),
							n.draggable && a.enableDraggable();
					}
				},
				destroy: function () {
					this.scrollbar.disableDraggable();
				},
			},
			G = {
				setTransform: function (t, a) {
					var i = this.rtl,
						n = e(t),
						r = i ? -1 : 1,
						s = n.attr('data-swiper-parallax') || '0',
						o = n.attr('data-swiper-parallax-x'),
						l = n.attr('data-swiper-parallax-y'),
						d = n.attr('data-swiper-parallax-scale'),
						c = n.attr('data-swiper-parallax-opacity');
					if (
						(o || l
							? ((o = o || '0'), (l = l || '0'))
							: this.isHorizontal()
							? ((o = s), (l = '0'))
							: ((l = s), (o = '0')),
						(o =
							0 <= o.indexOf('%')
								? parseInt(o, 10) * a * r + '%'
								: o * a * r + 'px'),
						(l =
							0 <= l.indexOf('%') ? parseInt(l, 10) * a + '%' : l * a + 'px'),
						null != c)
					) {
						var u = c - (c - 1) * (1 - Math.abs(a));
						n[0].style.opacity = u;
					}
					if (null == d) n.transform('translate3d(' + o + ', ' + l + ', 0px)');
					else {
						var p = d - (d - 1) * (1 - Math.abs(a));
						n.transform(
							'translate3d(' + o + ', ' + l + ', 0px) scale(' + p + ')'
						);
					}
				},
				setTranslate: function () {
					var t = this,
						a = t.$el,
						i = t.slides,
						n = t.progress,
						r = t.snapGrid;
					a
						.children(
							'[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]'
						)
						.each(function (e, a) {
							t.parallax.setTransform(a, n);
						}),
						i.each(function (a, i) {
							var s = i.progress;
							1 < t.params.slidesPerGroup &&
								'auto' !== t.params.slidesPerView &&
								(s += Math.ceil(a / 2) - n * (r.length - 1)),
								(s = Math.min(Math.max(s, -1), 1)),
								e(i)
									.find(
										'[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]'
									)
									.each(function (e, a) {
										t.parallax.setTransform(a, s);
									});
						});
				},
				setTransition: function (t) {
					void 0 === t && (t = this.params.speed),
						this.$el
							.find(
								'[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]'
							)
							.each(function (a, i) {
								var n = e(i),
									r =
										parseInt(n.attr('data-swiper-parallax-duration'), 10) || t;
								0 === t && (r = 0), n.transition(r);
							});
				},
			},
			q = {
				getDistanceBetweenTouches: function (e) {
					if (e.targetTouches.length < 2) return 1;
					var t = e.targetTouches[0].pageX,
						a = e.targetTouches[0].pageY,
						i = e.targetTouches[1].pageX,
						n = e.targetTouches[1].pageY;
					return Math.sqrt(Math.pow(i - t, 2) + Math.pow(n - a, 2));
				},
				onGestureStart: function (t) {
					var a = this,
						i = a.params.zoom,
						n = a.zoom,
						r = n.gesture;
					if (
						((n.fakeGestureTouched = !1),
						(n.fakeGestureMoved = !1),
						!h.gestures)
					) {
						if (
							'touchstart' !== t.type ||
							('touchstart' === t.type && t.targetTouches.length < 2)
						)
							return;
						(n.fakeGestureTouched = !0),
							(r.scaleStart = q.getDistanceBetweenTouches(t));
					}
					(r.$slideEl && r.$slideEl.length) ||
					((r.$slideEl = e(t.target).closest('.swiper-slide')),
					0 === r.$slideEl.length && (r.$slideEl = a.slides.eq(a.activeIndex)),
					(r.$imageEl = r.$slideEl.find('img, svg, canvas')),
					(r.$imageWrapEl = r.$imageEl.parent('.' + i.containerClass)),
					(r.maxRatio = r.$imageWrapEl.attr('data-swiper-zoom') || i.maxRatio),
					0 !== r.$imageWrapEl.length)
						? (r.$imageEl.transition(0), (a.zoom.isScaling = !0))
						: (r.$imageEl = void 0);
				},
				onGestureChange: function (e) {
					var t = this.params.zoom,
						a = this.zoom,
						i = a.gesture;
					if (!h.gestures) {
						if (
							'touchmove' !== e.type ||
							('touchmove' === e.type && e.targetTouches.length < 2)
						)
							return;
						(a.fakeGestureMoved = !0),
							(i.scaleMove = q.getDistanceBetweenTouches(e));
					}
					i.$imageEl &&
						0 !== i.$imageEl.length &&
						((a.scale = h.gestures
							? e.scale * a.currentScale
							: (i.scaleMove / i.scaleStart) * a.currentScale),
						a.scale > i.maxRatio &&
							(a.scale =
								i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, 0.5)),
						a.scale < t.minRatio &&
							(a.scale =
								t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, 0.5)),
						i.$imageEl.transform('translate3d(0,0,0) scale(' + a.scale + ')'));
				},
				onGestureEnd: function (e) {
					var t = this.params.zoom,
						a = this.zoom,
						i = a.gesture;
					if (!h.gestures) {
						if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
						if (
							'touchend' !== e.type ||
							('touchend' === e.type &&
								e.changedTouches.length < 2 &&
								!S.android)
						)
							return;
						(a.fakeGestureTouched = !1), (a.fakeGestureMoved = !1);
					}
					i.$imageEl &&
						0 !== i.$imageEl.length &&
						((a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio)),
						i.$imageEl
							.transition(this.params.speed)
							.transform('translate3d(0,0,0) scale(' + a.scale + ')'),
						(a.currentScale = a.scale),
						(a.isScaling = !1),
						1 === a.scale && (i.$slideEl = void 0));
				},
				onTouchStart: function (e) {
					var t = this.zoom,
						a = t.gesture,
						i = t.image;
					a.$imageEl &&
						0 !== a.$imageEl.length &&
						(i.isTouched ||
							(S.android && e.preventDefault(),
							(i.isTouched = !0),
							(i.touchesStart.x =
								'touchstart' === e.type ? e.targetTouches[0].pageX : e.pageX),
							(i.touchesStart.y =
								'touchstart' === e.type ? e.targetTouches[0].pageY : e.pageY)));
				},
				onTouchMove: function (e) {
					var t = this,
						a = t.zoom,
						i = a.gesture,
						n = a.image,
						r = a.velocity;
					if (
						i.$imageEl &&
						0 !== i.$imageEl.length &&
						((t.allowClick = !1), n.isTouched && i.$slideEl)
					) {
						n.isMoved ||
							((n.width = i.$imageEl[0].offsetWidth),
							(n.height = i.$imageEl[0].offsetHeight),
							(n.startX = p.getTranslate(i.$imageWrapEl[0], 'x') || 0),
							(n.startY = p.getTranslate(i.$imageWrapEl[0], 'y') || 0),
							(i.slideWidth = i.$slideEl[0].offsetWidth),
							(i.slideHeight = i.$slideEl[0].offsetHeight),
							i.$imageWrapEl.transition(0),
							t.rtl && ((n.startX = -n.startX), (n.startY = -n.startY)));
						var s = n.width * a.scale,
							o = n.height * a.scale;
						if (!(s < i.slideWidth && o < i.slideHeight)) {
							if (
								((n.minX = Math.min(i.slideWidth / 2 - s / 2, 0)),
								(n.maxX = -n.minX),
								(n.minY = Math.min(i.slideHeight / 2 - o / 2, 0)),
								(n.maxY = -n.minY),
								(n.touchesCurrent.x =
									'touchmove' === e.type ? e.targetTouches[0].pageX : e.pageX),
								(n.touchesCurrent.y =
									'touchmove' === e.type ? e.targetTouches[0].pageY : e.pageY),
								!n.isMoved && !a.isScaling)
							) {
								if (
									t.isHorizontal() &&
									((Math.floor(n.minX) === Math.floor(n.startX) &&
										n.touchesCurrent.x < n.touchesStart.x) ||
										(Math.floor(n.maxX) === Math.floor(n.startX) &&
											n.touchesCurrent.x > n.touchesStart.x))
								)
									return void (n.isTouched = !1);
								if (
									!t.isHorizontal() &&
									((Math.floor(n.minY) === Math.floor(n.startY) &&
										n.touchesCurrent.y < n.touchesStart.y) ||
										(Math.floor(n.maxY) === Math.floor(n.startY) &&
											n.touchesCurrent.y > n.touchesStart.y))
								)
									return void (n.isTouched = !1);
							}
							e.preventDefault(),
								e.stopPropagation(),
								(n.isMoved = !0),
								(n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX),
								(n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY),
								n.currentX < n.minX &&
									(n.currentX =
										n.minX + 1 - Math.pow(n.minX - n.currentX + 1, 0.8)),
								n.currentX > n.maxX &&
									(n.currentX =
										n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, 0.8)),
								n.currentY < n.minY &&
									(n.currentY =
										n.minY + 1 - Math.pow(n.minY - n.currentY + 1, 0.8)),
								n.currentY > n.maxY &&
									(n.currentY =
										n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, 0.8)),
								r.prevPositionX || (r.prevPositionX = n.touchesCurrent.x),
								r.prevPositionY || (r.prevPositionY = n.touchesCurrent.y),
								r.prevTime || (r.prevTime = Date.now()),
								(r.x =
									(n.touchesCurrent.x - r.prevPositionX) /
									(Date.now() - r.prevTime) /
									2),
								(r.y =
									(n.touchesCurrent.y - r.prevPositionY) /
									(Date.now() - r.prevTime) /
									2),
								Math.abs(n.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0),
								Math.abs(n.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0),
								(r.prevPositionX = n.touchesCurrent.x),
								(r.prevPositionY = n.touchesCurrent.y),
								(r.prevTime = Date.now()),
								i.$imageWrapEl.transform(
									'translate3d(' + n.currentX + 'px, ' + n.currentY + 'px,0)'
								);
						}
					}
				},
				onTouchEnd: function () {
					var e = this.zoom,
						t = e.gesture,
						a = e.image,
						i = e.velocity;
					if (t.$imageEl && 0 !== t.$imageEl.length) {
						if (!a.isTouched || !a.isMoved)
							return (a.isTouched = !1), void (a.isMoved = !1);
						(a.isTouched = !1), (a.isMoved = !1);
						var n = 300,
							r = 300,
							s = i.x * n,
							o = a.currentX + s,
							l = i.y * r,
							d = a.currentY + l;
						0 !== i.x && (n = Math.abs((o - a.currentX) / i.x)),
							0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
						var c = Math.max(n, r);
						(a.currentX = o), (a.currentY = d);
						var u = a.width * e.scale,
							p = a.height * e.scale;
						(a.minX = Math.min(t.slideWidth / 2 - u / 2, 0)),
							(a.maxX = -a.minX),
							(a.minY = Math.min(t.slideHeight / 2 - p / 2, 0)),
							(a.maxY = -a.minY),
							(a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX)),
							(a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY)),
							t.$imageWrapEl
								.transition(c)
								.transform(
									'translate3d(' + a.currentX + 'px, ' + a.currentY + 'px,0)'
								);
					}
				},
				onTransitionEnd: function () {
					var e = this.zoom,
						t = e.gesture;
					t.$slideEl &&
						this.previousIndex !== this.activeIndex &&
						(t.$imageEl.transform('translate3d(0,0,0) scale(1)'),
						t.$imageWrapEl.transform('translate3d(0,0,0)'),
						(e.scale = 1),
						(e.currentScale = 1),
						(t.$slideEl = void 0),
						(t.$imageEl = void 0),
						(t.$imageWrapEl = void 0));
				},
				toggle: function (e) {
					var t = this.zoom;
					t.scale && 1 !== t.scale ? t.out() : t.in(e);
				},
				in: function (t) {
					var a,
						i,
						n,
						r,
						s,
						o,
						l,
						d,
						c,
						u,
						p,
						h,
						f,
						m,
						g,
						v,
						b = this,
						y = b.zoom,
						w = b.params.zoom,
						E = y.gesture,
						x = y.image;
					E.$slideEl ||
						((E.$slideEl = b.clickedSlide
							? e(b.clickedSlide)
							: b.slides.eq(b.activeIndex)),
						(E.$imageEl = E.$slideEl.find('img, svg, canvas')),
						(E.$imageWrapEl = E.$imageEl.parent('.' + w.containerClass))),
						E.$imageEl &&
							0 !== E.$imageEl.length &&
							(E.$slideEl.addClass('' + w.zoomedSlideClass),
							(i =
								void 0 === x.touchesStart.x && t
									? ((a =
											'touchend' === t.type
												? t.changedTouches[0].pageX
												: t.pageX),
									  'touchend' === t.type ? t.changedTouches[0].pageY : t.pageY)
									: ((a = x.touchesStart.x), x.touchesStart.y)),
							(y.scale = E.$imageWrapEl.attr('data-swiper-zoom') || w.maxRatio),
							(y.currentScale =
								E.$imageWrapEl.attr('data-swiper-zoom') || w.maxRatio),
							t
								? ((g = E.$slideEl[0].offsetWidth),
								  (v = E.$slideEl[0].offsetHeight),
								  (n = E.$slideEl.offset().left + g / 2 - a),
								  (r = E.$slideEl.offset().top + v / 2 - i),
								  (l = E.$imageEl[0].offsetWidth),
								  (d = E.$imageEl[0].offsetHeight),
								  (c = l * y.scale),
								  (u = d * y.scale),
								  (f = -(p = Math.min(g / 2 - c / 2, 0))),
								  (m = -(h = Math.min(v / 2 - u / 2, 0))),
								  (s = n * y.scale) < p && (s = p),
								  f < s && (s = f),
								  (o = r * y.scale) < h && (o = h),
								  m < o && (o = m))
								: (o = s = 0),
							E.$imageWrapEl
								.transition(300)
								.transform('translate3d(' + s + 'px, ' + o + 'px,0)'),
							E.$imageEl
								.transition(300)
								.transform('translate3d(0,0,0) scale(' + y.scale + ')'));
				},
				out: function () {
					var t = this,
						a = t.zoom,
						i = t.params.zoom,
						n = a.gesture;
					n.$slideEl ||
						((n.$slideEl = t.clickedSlide
							? e(t.clickedSlide)
							: t.slides.eq(t.activeIndex)),
						(n.$imageEl = n.$slideEl.find('img, svg, canvas')),
						(n.$imageWrapEl = n.$imageEl.parent('.' + i.containerClass))),
						n.$imageEl &&
							0 !== n.$imageEl.length &&
							((a.scale = 1),
							(a.currentScale = 1),
							n.$imageWrapEl.transition(300).transform('translate3d(0,0,0)'),
							n.$imageEl
								.transition(300)
								.transform('translate3d(0,0,0) scale(1)'),
							n.$slideEl.removeClass('' + i.zoomedSlideClass),
							(n.$slideEl = void 0));
				},
				enable: function () {
					var e = this,
						t = e.zoom;
					if (!t.enabled) {
						t.enabled = !0;
						var a = !(
							'touchstart' !== e.touchEvents.start ||
							!h.passiveListener ||
							!e.params.passiveListeners
						) && { passive: !0, capture: !1 };
						h.gestures
							? (e.$wrapperEl.on(
									'gesturestart',
									'.swiper-slide',
									t.onGestureStart,
									a
							  ),
							  e.$wrapperEl.on(
									'gesturechange',
									'.swiper-slide',
									t.onGestureChange,
									a
							  ),
							  e.$wrapperEl.on(
									'gestureend',
									'.swiper-slide',
									t.onGestureEnd,
									a
							  ))
							: 'touchstart' === e.touchEvents.start &&
							  (e.$wrapperEl.on(
									e.touchEvents.start,
									'.swiper-slide',
									t.onGestureStart,
									a
							  ),
							  e.$wrapperEl.on(
									e.touchEvents.move,
									'.swiper-slide',
									t.onGestureChange,
									a
							  ),
							  e.$wrapperEl.on(
									e.touchEvents.end,
									'.swiper-slide',
									t.onGestureEnd,
									a
							  )),
							e.$wrapperEl.on(
								e.touchEvents.move,
								'.' + e.params.zoom.containerClass,
								t.onTouchMove
							);
					}
				},
				disable: function () {
					var e = this,
						t = e.zoom;
					if (t.enabled) {
						e.zoom.enabled = !1;
						var a = !(
							'touchstart' !== e.touchEvents.start ||
							!h.passiveListener ||
							!e.params.passiveListeners
						) && { passive: !0, capture: !1 };
						h.gestures
							? (e.$wrapperEl.off(
									'gesturestart',
									'.swiper-slide',
									t.onGestureStart,
									a
							  ),
							  e.$wrapperEl.off(
									'gesturechange',
									'.swiper-slide',
									t.onGestureChange,
									a
							  ),
							  e.$wrapperEl.off(
									'gestureend',
									'.swiper-slide',
									t.onGestureEnd,
									a
							  ))
							: 'touchstart' === e.touchEvents.start &&
							  (e.$wrapperEl.off(
									e.touchEvents.start,
									'.swiper-slide',
									t.onGestureStart,
									a
							  ),
							  e.$wrapperEl.off(
									e.touchEvents.move,
									'.swiper-slide',
									t.onGestureChange,
									a
							  ),
							  e.$wrapperEl.off(
									e.touchEvents.end,
									'.swiper-slide',
									t.onGestureEnd,
									a
							  )),
							e.$wrapperEl.off(
								e.touchEvents.move,
								'.' + e.params.zoom.containerClass,
								t.onTouchMove
							);
					}
				},
			},
			F = {
				loadInSlide: function (t, a) {
					void 0 === a && (a = !0);
					var i = this,
						n = i.params.lazy;
					if (void 0 !== t && 0 !== i.slides.length) {
						var r =
								i.virtual && i.params.virtual.enabled
									? i.$wrapperEl.children(
											'.' +
												i.params.slideClass +
												'[data-swiper-slide-index="' +
												t +
												'"]'
									  )
									: i.slides.eq(t),
							s = r.find(
								'.' +
									n.elementClass +
									':not(.' +
									n.loadedClass +
									'):not(.' +
									n.loadingClass +
									')'
							);
						!r.hasClass(n.elementClass) ||
							r.hasClass(n.loadedClass) ||
							r.hasClass(n.loadingClass) ||
							(s = s.add(r[0])),
							0 !== s.length &&
								s.each(function (t, s) {
									var o = e(s);
									o.addClass(n.loadingClass);
									var l = o.attr('data-background'),
										d = o.attr('data-src'),
										c = o.attr('data-srcset'),
										u = o.attr('data-sizes');
									i.loadImage(o[0], d || l, c, u, !1, function () {
										if (null != i && i && (!i || i.params) && !i.destroyed) {
											if (
												(l
													? (o.css('background-image', 'url("' + l + '")'),
													  o.removeAttr('data-background'))
													: (c &&
															(o.attr('srcset', c),
															o.removeAttr('data-srcset')),
													  u &&
															(o.attr('sizes', u), o.removeAttr('data-sizes')),
													  d && (o.attr('src', d), o.removeAttr('data-src'))),
												o.addClass(n.loadedClass).removeClass(n.loadingClass),
												r.find('.' + n.preloaderClass).remove(),
												i.params.loop && a)
											) {
												var e = r.attr('data-swiper-slide-index');
												if (r.hasClass(i.params.slideDuplicateClass)) {
													var t = i.$wrapperEl.children(
														'[data-swiper-slide-index="' +
															e +
															'"]:not(.' +
															i.params.slideDuplicateClass +
															')'
													);
													i.lazy.loadInSlide(t.index(), !1);
												} else {
													var s = i.$wrapperEl.children(
														'.' +
															i.params.slideDuplicateClass +
															'[data-swiper-slide-index="' +
															e +
															'"]'
													);
													i.lazy.loadInSlide(s.index(), !1);
												}
											}
											i.emit('lazyImageReady', r[0], o[0]);
										}
									}),
										i.emit('lazyImageLoad', r[0], o[0]);
								});
					}
				},
				load: function () {
					function t(e) {
						if (l) {
							if (
								n.children(
									'.' + r.slideClass + '[data-swiper-slide-index="' + e + '"]'
								).length
							)
								return !0;
						} else if (s[e]) return !0;
						return !1;
					}
					function a(t) {
						return l ? e(t).attr('data-swiper-slide-index') : e(t).index();
					}
					var i = this,
						n = i.$wrapperEl,
						r = i.params,
						s = i.slides,
						o = i.activeIndex,
						l = i.virtual && r.virtual.enabled,
						d = r.lazy,
						c = r.slidesPerView;
					if (
						('auto' === c && (c = 0),
						i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0),
						i.params.watchSlidesVisibility)
					)
						n.children('.' + r.slideVisibleClass).each(function (t, a) {
							var n = l ? e(a).attr('data-swiper-slide-index') : e(a).index();
							i.lazy.loadInSlide(n);
						});
					else if (1 < c)
						for (var u = o; u < o + c; u += 1) t(u) && i.lazy.loadInSlide(u);
					else i.lazy.loadInSlide(o);
					if (d.loadPrevNext)
						if (1 < c || (d.loadPrevNextAmount && 1 < d.loadPrevNextAmount)) {
							for (
								var p = d.loadPrevNextAmount,
									h = c,
									f = Math.min(o + h + Math.max(p, h), s.length),
									m = Math.max(o - Math.max(h, p), 0),
									g = o + c;
								g < f;
								g += 1
							)
								t(g) && i.lazy.loadInSlide(g);
							for (var v = m; v < o; v += 1) t(v) && i.lazy.loadInSlide(v);
						} else {
							var b = n.children('.' + r.slideNextClass);
							0 < b.length && i.lazy.loadInSlide(a(b));
							var y = n.children('.' + r.slidePrevClass);
							0 < y.length && i.lazy.loadInSlide(a(y));
						}
				},
			},
			U = {
				LinearSpline: function (e, t) {
					var a,
						i,
						n,
						r,
						s,
						o = function (e, t) {
							for (i = -1, a = e.length; 1 < a - i; )
								e[(n = (a + i) >> 1)] <= t ? (i = n) : (a = n);
							return a;
						};
					return (
						(this.x = e),
						(this.y = t),
						(this.lastIndex = e.length - 1),
						(this.interpolate = function (e) {
							return e
								? ((s = o(this.x, e)),
								  (r = s - 1),
								  ((e - this.x[r]) * (this.y[s] - this.y[r])) /
										(this.x[s] - this.x[r]) +
										this.y[r])
								: 0;
						}),
						this
					);
				},
				getInterpolateFunction: function (e) {
					var t = this;
					t.controller.spline ||
						(t.controller.spline = t.params.loop
							? new U.LinearSpline(t.slidesGrid, e.slidesGrid)
							: new U.LinearSpline(t.snapGrid, e.snapGrid));
				},
				setTranslate: function (e, t) {
					function a(e) {
						var t = r.rtlTranslate ? -r.translate : r.translate;
						'slide' === r.params.controller.by &&
							(r.controller.getInterpolateFunction(e),
							(n = -r.controller.spline.interpolate(-t))),
							(n && 'container' !== r.params.controller.by) ||
								((i =
									(e.maxTranslate() - e.minTranslate()) /
									(r.maxTranslate() - r.minTranslate())),
								(n = (t - r.minTranslate()) * i + e.minTranslate())),
							r.params.controller.inverse && (n = e.maxTranslate() - n),
							e.updateProgress(n),
							e.setTranslate(n, r),
							e.updateActiveIndex(),
							e.updateSlidesClasses();
					}
					var i,
						n,
						r = this,
						s = r.controller.control;
					if (Array.isArray(s))
						for (var o = 0; o < s.length; o += 1)
							s[o] !== t && s[o] instanceof M && a(s[o]);
					else s instanceof M && t !== s && a(s);
				},
				setTransition: function (e, t) {
					function a(t) {
						t.setTransition(e, n),
							0 !== e &&
								(t.transitionStart(),
								t.params.autoHeight &&
									p.nextTick(function () {
										t.updateAutoHeight();
									}),
								t.$wrapperEl.transitionEnd(function () {
									r &&
										(t.params.loop &&
											'slide' === n.params.controller.by &&
											t.loopFix(),
										t.transitionEnd());
								}));
					}
					var i,
						n = this,
						r = n.controller.control;
					if (Array.isArray(r))
						for (i = 0; i < r.length; i += 1)
							r[i] !== t && r[i] instanceof M && a(r[i]);
					else r instanceof M && t !== r && a(r);
				},
			},
			X = {
				makeElFocusable: function (e) {
					return e.attr('tabIndex', '0'), e;
				},
				addElRole: function (e, t) {
					return e.attr('role', t), e;
				},
				addElLabel: function (e, t) {
					return e.attr('aria-label', t), e;
				},
				disableEl: function (e) {
					return e.attr('aria-disabled', !0), e;
				},
				enableEl: function (e) {
					return e.attr('aria-disabled', !1), e;
				},
				onEnterKey: function (t) {
					var a = this,
						i = a.params.a11y;
					if (13 === t.keyCode) {
						var n = e(t.target);
						a.navigation &&
							a.navigation.$nextEl &&
							n.is(a.navigation.$nextEl) &&
							((a.isEnd && !a.params.loop) || a.slideNext(),
							a.isEnd
								? a.a11y.notify(i.lastSlideMessage)
								: a.a11y.notify(i.nextSlideMessage)),
							a.navigation &&
								a.navigation.$prevEl &&
								n.is(a.navigation.$prevEl) &&
								((a.isBeginning && !a.params.loop) || a.slidePrev(),
								a.isBeginning
									? a.a11y.notify(i.firstSlideMessage)
									: a.a11y.notify(i.prevSlideMessage)),
							a.pagination &&
								n.is('.' + a.params.pagination.bulletClass) &&
								n[0].click();
					}
				},
				notify: function (e) {
					var t = this.a11y.liveRegion;
					0 !== t.length && (t.html(''), t.html(e));
				},
				updateNavigation: function () {
					var e = this;
					if (!e.params.loop) {
						var t = e.navigation,
							a = t.$nextEl,
							i = t.$prevEl;
						i &&
							0 < i.length &&
							(e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)),
							a &&
								0 < a.length &&
								(e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a));
					}
				},
				updatePagination: function () {
					var t = this,
						a = t.params.a11y;
					t.pagination &&
						t.params.pagination.clickable &&
						t.pagination.bullets &&
						t.pagination.bullets.length &&
						t.pagination.bullets.each(function (i, n) {
							var r = e(n);
							t.a11y.makeElFocusable(r),
								t.a11y.addElRole(r, 'button'),
								t.a11y.addElLabel(
									r,
									a.paginationBulletMessage.replace(/{{index}}/, r.index() + 1)
								);
						});
				},
				init: function () {
					var e = this;
					e.$el.append(e.a11y.liveRegion);
					var t,
						a,
						i = e.params.a11y;
					e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
						e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl),
						t &&
							(e.a11y.makeElFocusable(t),
							e.a11y.addElRole(t, 'button'),
							e.a11y.addElLabel(t, i.nextSlideMessage),
							t.on('keydown', e.a11y.onEnterKey)),
						a &&
							(e.a11y.makeElFocusable(a),
							e.a11y.addElRole(a, 'button'),
							e.a11y.addElLabel(a, i.prevSlideMessage),
							a.on('keydown', e.a11y.onEnterKey)),
						e.pagination &&
							e.params.pagination.clickable &&
							e.pagination.bullets &&
							e.pagination.bullets.length &&
							e.pagination.$el.on(
								'keydown',
								'.' + e.params.pagination.bulletClass,
								e.a11y.onEnterKey
							);
				},
				destroy: function () {
					var e,
						t,
						a = this;
					a.a11y.liveRegion &&
						0 < a.a11y.liveRegion.length &&
						a.a11y.liveRegion.remove(),
						a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl),
						a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl),
						e && e.off('keydown', a.a11y.onEnterKey),
						t && t.off('keydown', a.a11y.onEnterKey),
						a.pagination &&
							a.params.pagination.clickable &&
							a.pagination.bullets &&
							a.pagination.bullets.length &&
							a.pagination.$el.off(
								'keydown',
								'.' + a.params.pagination.bulletClass,
								a.a11y.onEnterKey
							);
				},
			},
			V = {
				init: function () {
					var e = this;
					if (e.params.history) {
						if (!r.history || !r.history.pushState)
							return (
								(e.params.history.enabled = !1),
								void (e.params.hashNavigation.enabled = !0)
							);
						var t = e.history;
						(t.initialized = !0),
							(t.paths = V.getPathValues()),
							(t.paths.key || t.paths.value) &&
								(t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit),
								e.params.history.replaceState ||
									r.addEventListener('popstate', e.history.setHistoryPopState));
					}
				},
				destroy: function () {
					this.params.history.replaceState ||
						r.removeEventListener('popstate', this.history.setHistoryPopState);
				},
				setHistoryPopState: function () {
					(this.history.paths = V.getPathValues()),
						this.history.scrollToSlide(
							this.params.speed,
							this.history.paths.value,
							!1
						);
				},
				getPathValues: function () {
					var e = r.location.pathname
							.slice(1)
							.split('/')
							.filter(function (e) {
								return '' !== e;
							}),
						t = e.length;
					return { key: e[t - 2], value: e[t - 1] };
				},
				setHistory: function (e, t) {
					if (this.history.initialized && this.params.history.enabled) {
						var a = this.slides.eq(t),
							i = V.slugify(a.attr('data-history'));
						r.location.pathname.includes(e) || (i = e + '/' + i);
						var n = r.history.state;
						(n && n.value === i) ||
							(this.params.history.replaceState
								? r.history.replaceState({ value: i }, null, i)
								: r.history.pushState({ value: i }, null, i));
					}
				},
				slugify: function (e) {
					return e
						.toString()
						.replace(/\s+/g, '-')
						.replace(/[^\w-]+/g, '')
						.replace(/--+/g, '-')
						.replace(/^-+/, '')
						.replace(/-+$/, '');
				},
				scrollToSlide: function (e, t, a) {
					var i = this;
					if (t)
						for (var n = 0, r = i.slides.length; n < r; n += 1) {
							var s = i.slides.eq(n);
							if (
								V.slugify(s.attr('data-history')) === t &&
								!s.hasClass(i.params.slideDuplicateClass)
							) {
								var o = s.index();
								i.slideTo(o, e, a);
							}
						}
					else i.slideTo(0, e, a);
				},
			},
			Y = {
				onHashCange: function () {
					var e = this,
						t = n.location.hash.replace('#', '');
					if (t !== e.slides.eq(e.activeIndex).attr('data-hash')) {
						var a = e.$wrapperEl
							.children('.' + e.params.slideClass + '[data-hash="' + t + '"]')
							.index();
						if (void 0 === a) return;
						e.slideTo(a);
					}
				},
				setHash: function () {
					var e = this;
					if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
						if (
							e.params.hashNavigation.replaceState &&
							r.history &&
							r.history.replaceState
						)
							r.history.replaceState(
								null,
								null,
								'#' + e.slides.eq(e.activeIndex).attr('data-hash') || ''
							);
						else {
							var t = e.slides.eq(e.activeIndex),
								a = t.attr('data-hash') || t.attr('data-history');
							n.location.hash = a || '';
						}
				},
				init: function () {
					var t = this;
					if (
						!(
							!t.params.hashNavigation.enabled ||
							(t.params.history && t.params.history.enabled)
						)
					) {
						t.hashNavigation.initialized = !0;
						var a = n.location.hash.replace('#', '');
						if (a)
							for (var i = 0, s = t.slides.length; i < s; i += 1) {
								var o = t.slides.eq(i);
								if (
									(o.attr('data-hash') || o.attr('data-history')) === a &&
									!o.hasClass(t.params.slideDuplicateClass)
								) {
									var l = o.index();
									t.slideTo(l, 0, t.params.runCallbacksOnInit, !0);
								}
							}
						t.params.hashNavigation.watchState &&
							e(r).on('hashchange', t.hashNavigation.onHashCange);
					}
				},
				destroy: function () {
					this.params.hashNavigation.watchState &&
						e(r).off('hashchange', this.hashNavigation.onHashCange);
				},
			},
			W = {
				run: function () {
					var e = this,
						t = e.slides.eq(e.activeIndex),
						a = e.params.autoplay.delay;
					t.attr('data-swiper-autoplay') &&
						(a = t.attr('data-swiper-autoplay') || e.params.autoplay.delay),
						clearTimeout(e.autoplay.timeout),
						(e.autoplay.timeout = p.nextTick(function () {
							e.params.autoplay.reverseDirection
								? e.params.loop
									? (e.loopFix(),
									  e.slidePrev(e.params.speed, !0, !0),
									  e.emit('autoplay'))
									: e.isBeginning
									? e.params.autoplay.stopOnLastSlide
										? e.autoplay.stop()
										: (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
										  e.emit('autoplay'))
									: (e.slidePrev(e.params.speed, !0, !0), e.emit('autoplay'))
								: e.params.loop
								? (e.loopFix(),
								  e.slideNext(e.params.speed, !0, !0),
								  e.emit('autoplay'))
								: e.isEnd
								? e.params.autoplay.stopOnLastSlide
									? e.autoplay.stop()
									: (e.slideTo(0, e.params.speed, !0, !0), e.emit('autoplay'))
								: (e.slideNext(e.params.speed, !0, !0), e.emit('autoplay'));
						}, a));
				},
				start: function () {
					var e = this;
					return (
						void 0 === e.autoplay.timeout &&
						!e.autoplay.running &&
						((e.autoplay.running = !0),
						e.emit('autoplayStart'),
						e.autoplay.run(),
						!0)
					);
				},
				stop: function () {
					var e = this;
					return (
						!!e.autoplay.running &&
						void 0 !== e.autoplay.timeout &&
						(e.autoplay.timeout &&
							(clearTimeout(e.autoplay.timeout), (e.autoplay.timeout = void 0)),
						(e.autoplay.running = !1),
						e.emit('autoplayStop'),
						!0)
					);
				},
				pause: function (e) {
					var t = this;
					t.autoplay.running &&
						(t.autoplay.paused ||
							(t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
							(t.autoplay.paused = !0),
							0 !== e && t.params.autoplay.waitForTransition
								? (t.$wrapperEl[0].addEventListener(
										'transitionend',
										t.autoplay.onTransitionEnd
								  ),
								  t.$wrapperEl[0].addEventListener(
										'webkitTransitionEnd',
										t.autoplay.onTransitionEnd
								  ))
								: ((t.autoplay.paused = !1), t.autoplay.run())));
				},
			},
			K = {
				setTranslate: function () {
					for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
						var i = e.slides.eq(a),
							n = -i[0].swiperSlideOffset;
						e.params.virtualTranslate || (n -= e.translate);
						var r = 0;
						e.isHorizontal() || ((r = n), (n = 0));
						var s = e.params.fadeEffect.crossFade
							? Math.max(1 - Math.abs(i[0].progress), 0)
							: 1 + Math.min(Math.max(i[0].progress, -1), 0);
						i.css({ opacity: s }).transform(
							'translate3d(' + n + 'px, ' + r + 'px, 0px)'
						);
					}
				},
				setTransition: function (e) {
					var t = this,
						a = t.slides,
						i = t.$wrapperEl;
					if ((a.transition(e), t.params.virtualTranslate && 0 !== e)) {
						var n = !1;
						a.transitionEnd(function () {
							if (!n && t && !t.destroyed) {
								(n = !0), (t.animating = !1);
								for (
									var e = ['webkitTransitionEnd', 'transitionend'], a = 0;
									a < e.length;
									a += 1
								)
									i.trigger(e[a]);
							}
						});
					}
				},
			},
			Z = {
				setTranslate: function () {
					var t,
						a = this,
						i = a.$el,
						n = a.$wrapperEl,
						r = a.slides,
						s = a.width,
						o = a.height,
						l = a.rtlTranslate,
						d = a.size,
						c = a.params.cubeEffect,
						u = a.isHorizontal(),
						p = a.virtual && a.params.virtual.enabled,
						h = 0;
					c.shadow &&
						(u
							? (0 === (t = n.find('.swiper-cube-shadow')).length &&
									((t = e('<div class="swiper-cube-shadow"></div>')),
									n.append(t)),
							  t.css({ height: s + 'px' }))
							: 0 === (t = i.find('.swiper-cube-shadow')).length &&
							  ((t = e('<div class="swiper-cube-shadow"></div>')),
							  i.append(t)));
					for (var m = 0; m < r.length; m += 1) {
						var g = r.eq(m),
							v = m;
						p && (v = parseInt(g.attr('data-swiper-slide-index'), 10));
						var b = 90 * v,
							y = Math.floor(b / 360);
						l && ((b = -b), (y = Math.floor(-b / 360)));
						var w = Math.max(Math.min(g[0].progress, 1), -1),
							E = 0,
							x = 0,
							S = 0;
						v % 4 == 0
							? ((E = 4 * -y * d), (S = 0))
							: (v - 1) % 4 == 0
							? ((E = 0), (S = 4 * -y * d))
							: (v - 2) % 4 == 0
							? ((E = d + 4 * y * d), (S = d))
							: (v - 3) % 4 == 0 && ((E = -d), (S = 3 * d + 4 * d * y)),
							l && (E = -E),
							u || ((x = E), (E = 0));
						var T =
							'rotateX(' +
							(u ? 0 : -b) +
							'deg) rotateY(' +
							(u ? b : 0) +
							'deg) translate3d(' +
							E +
							'px, ' +
							x +
							'px, ' +
							S +
							'px)';
						if (
							(w <= 1 &&
								-1 < w &&
								((h = 90 * v + 90 * w), l && (h = 90 * -v - 90 * w)),
							g.transform(T),
							c.slideShadows)
						) {
							var C = u
									? g.find('.swiper-slide-shadow-left')
									: g.find('.swiper-slide-shadow-top'),
								_ = u
									? g.find('.swiper-slide-shadow-right')
									: g.find('.swiper-slide-shadow-bottom');
							0 === C.length &&
								((C = e(
									'<div class="swiper-slide-shadow-' +
										(u ? 'left' : 'top') +
										'"></div>'
								)),
								g.append(C)),
								0 === _.length &&
									((_ = e(
										'<div class="swiper-slide-shadow-' +
											(u ? 'right' : 'bottom') +
											'"></div>'
									)),
									g.append(_)),
								C.length && (C[0].style.opacity = Math.max(-w, 0)),
								_.length && (_[0].style.opacity = Math.max(w, 0));
						}
					}
					if (
						(n.css({
							'-webkit-transform-origin': '50% 50% -' + d / 2 + 'px',
							'-moz-transform-origin': '50% 50% -' + d / 2 + 'px',
							'-ms-transform-origin': '50% 50% -' + d / 2 + 'px',
							'transform-origin': '50% 50% -' + d / 2 + 'px',
						}),
						c.shadow)
					)
						if (u)
							t.transform(
								'translate3d(0px, ' +
									(s / 2 + c.shadowOffset) +
									'px, ' +
									-s / 2 +
									'px) rotateX(90deg) rotateZ(0deg) scale(' +
									c.shadowScale +
									')'
							);
						else {
							var M = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
								k =
									1.5 -
									(Math.sin((2 * M * Math.PI) / 360) / 2 +
										Math.cos((2 * M * Math.PI) / 360) / 2),
								O = c.shadowScale,
								N = c.shadowScale / k,
								P = c.shadowOffset;
							t.transform(
								'scale3d(' +
									O +
									', 1, ' +
									N +
									') translate3d(0px, ' +
									(o / 2 + P) +
									'px, ' +
									-o / 2 / N +
									'px) rotateX(-90deg)'
							);
						}
					var I = f.isSafari || f.isUiWebView ? -d / 2 : 0;
					n.transform(
						'translate3d(0px,0,' +
							I +
							'px) rotateX(' +
							(a.isHorizontal() ? 0 : h) +
							'deg) rotateY(' +
							(a.isHorizontal() ? -h : 0) +
							'deg)'
					);
				},
				setTransition: function (e) {
					var t = this.$el;
					this.slides
						.transition(e)
						.find(
							'.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
						)
						.transition(e),
						this.params.cubeEffect.shadow &&
							!this.isHorizontal() &&
							t.find('.swiper-cube-shadow').transition(e);
				},
			},
			Q = {
				setTranslate: function () {
					for (
						var t = this, a = t.slides, i = t.rtlTranslate, n = 0;
						n < a.length;
						n += 1
					) {
						var r = a.eq(n),
							s = r[0].progress;
						t.params.flipEffect.limitRotation &&
							(s = Math.max(Math.min(r[0].progress, 1), -1));
						var o = -180 * s,
							l = 0,
							d = -r[0].swiperSlideOffset,
							c = 0;
						if (
							(t.isHorizontal()
								? i && (o = -o)
								: ((c = d), (l = -o), (o = d = 0)),
							(r[0].style.zIndex = -Math.abs(Math.round(s)) + a.length),
							t.params.flipEffect.slideShadows)
						) {
							var u = t.isHorizontal()
									? r.find('.swiper-slide-shadow-left')
									: r.find('.swiper-slide-shadow-top'),
								p = t.isHorizontal()
									? r.find('.swiper-slide-shadow-right')
									: r.find('.swiper-slide-shadow-bottom');
							0 === u.length &&
								((u = e(
									'<div class="swiper-slide-shadow-' +
										(t.isHorizontal() ? 'left' : 'top') +
										'"></div>'
								)),
								r.append(u)),
								0 === p.length &&
									((p = e(
										'<div class="swiper-slide-shadow-' +
											(t.isHorizontal() ? 'right' : 'bottom') +
											'"></div>'
									)),
									r.append(p)),
								u.length && (u[0].style.opacity = Math.max(-s, 0)),
								p.length && (p[0].style.opacity = Math.max(s, 0));
						}
						r.transform(
							'translate3d(' +
								d +
								'px, ' +
								c +
								'px, 0px) rotateX(' +
								l +
								'deg) rotateY(' +
								o +
								'deg)'
						);
					}
				},
				setTransition: function (e) {
					var t = this,
						a = t.slides,
						i = t.activeIndex,
						n = t.$wrapperEl;
					if (
						(a
							.transition(e)
							.find(
								'.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
							)
							.transition(e),
						t.params.virtualTranslate && 0 !== e)
					) {
						var r = !1;
						a.eq(i).transitionEnd(function () {
							if (!r && t && !t.destroyed) {
								(r = !0), (t.animating = !1);
								for (
									var e = ['webkitTransitionEnd', 'transitionend'], a = 0;
									a < e.length;
									a += 1
								)
									n.trigger(e[a]);
							}
						});
					}
				},
			},
			J = {
				setTranslate: function () {
					for (
						var t = this,
							a = t.width,
							i = t.height,
							n = t.slides,
							r = t.$wrapperEl,
							s = t.slidesSizesGrid,
							o = t.params.coverflowEffect,
							l = t.isHorizontal(),
							d = t.translate,
							c = l ? a / 2 - d : i / 2 - d,
							u = l ? o.rotate : -o.rotate,
							p = o.depth,
							f = 0,
							m = n.length;
						f < m;
						f += 1
					) {
						var g = n.eq(f),
							v = s[f],
							b = ((c - g[0].swiperSlideOffset - v / 2) / v) * o.modifier,
							y = l ? u * b : 0,
							w = l ? 0 : u * b,
							E = -p * Math.abs(b),
							x = l ? 0 : o.stretch * b,
							S = l ? o.stretch * b : 0;
						Math.abs(S) < 0.001 && (S = 0),
							Math.abs(x) < 0.001 && (x = 0),
							Math.abs(E) < 0.001 && (E = 0),
							Math.abs(y) < 0.001 && (y = 0),
							Math.abs(w) < 0.001 && (w = 0);
						var T =
							'translate3d(' +
							S +
							'px,' +
							x +
							'px,' +
							E +
							'px)  rotateX(' +
							w +
							'deg) rotateY(' +
							y +
							'deg)';
						if (
							(g.transform(T),
							(g[0].style.zIndex = 1 - Math.abs(Math.round(b))),
							o.slideShadows)
						) {
							var C = l
									? g.find('.swiper-slide-shadow-left')
									: g.find('.swiper-slide-shadow-top'),
								_ = l
									? g.find('.swiper-slide-shadow-right')
									: g.find('.swiper-slide-shadow-bottom');
							0 === C.length &&
								((C = e(
									'<div class="swiper-slide-shadow-' +
										(l ? 'left' : 'top') +
										'"></div>'
								)),
								g.append(C)),
								0 === _.length &&
									((_ = e(
										'<div class="swiper-slide-shadow-' +
											(l ? 'right' : 'bottom') +
											'"></div>'
									)),
									g.append(_)),
								C.length && (C[0].style.opacity = 0 < b ? b : 0),
								_.length && (_[0].style.opacity = 0 < -b ? -b : 0);
						}
					}
					(h.pointerEvents || h.prefixedPointerEvents) &&
						(r[0].style.perspectiveOrigin = c + 'px 50%');
				},
				setTransition: function (e) {
					this.slides
						.transition(e)
						.find(
							'.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
						)
						.transition(e);
				},
			},
			ee = {
				init: function () {
					var e = this,
						t = e.params.thumbs,
						a = e.constructor;
					t.swiper instanceof a
						? ((e.thumbs.swiper = t.swiper),
						  p.extend(e.thumbs.swiper.originalParams, {
								watchSlidesProgress: !0,
								slideToClickedSlide: !1,
						  }),
						  p.extend(e.thumbs.swiper.params, {
								watchSlidesProgress: !0,
								slideToClickedSlide: !1,
						  }))
						: p.isObject(t.swiper) &&
						  ((e.thumbs.swiper = new a(
								p.extend({}, t.swiper, {
									watchSlidesVisibility: !0,
									watchSlidesProgress: !0,
									slideToClickedSlide: !1,
								})
						  )),
						  (e.thumbs.swiperCreated = !0)),
						e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
						e.thumbs.swiper.on('tap', e.thumbs.onThumbClick);
				},
				onThumbClick: function () {
					var t = this,
						a = t.thumbs.swiper;
					if (a) {
						var i = a.clickedIndex,
							n = a.clickedSlide;
						if (
							!(
								(n && e(n).hasClass(t.params.thumbs.slideThumbActiveClass)) ||
								null == i
							)
						) {
							var r;
							if (
								((r = a.params.loop
									? parseInt(
											e(a.clickedSlide).attr('data-swiper-slide-index'),
											10
									  )
									: i),
								t.params.loop)
							) {
								var s = t.activeIndex;
								t.slides.eq(s).hasClass(t.params.slideDuplicateClass) &&
									(t.loopFix(),
									(t._clientLeft = t.$wrapperEl[0].clientLeft),
									(s = t.activeIndex));
								var o = t.slides
										.eq(s)
										.prevAll('[data-swiper-slide-index="' + r + '"]')
										.eq(0)
										.index(),
									l = t.slides
										.eq(s)
										.nextAll('[data-swiper-slide-index="' + r + '"]')
										.eq(0)
										.index();
								r = void 0 === o ? l : void 0 === l ? o : l - s < s - o ? l : o;
							}
							t.slideTo(r);
						}
					}
				},
				update: function (e) {
					var t = this,
						a = t.thumbs.swiper;
					if (a) {
						var i =
							'auto' === a.params.slidesPerView
								? a.slidesPerViewDynamic()
								: a.params.slidesPerView;
						if (t.realIndex !== a.realIndex) {
							var n,
								r = a.activeIndex;
							if (a.params.loop) {
								a.slides.eq(r).hasClass(a.params.slideDuplicateClass) &&
									(a.loopFix(),
									(a._clientLeft = a.$wrapperEl[0].clientLeft),
									(r = a.activeIndex));
								var s = a.slides
										.eq(r)
										.prevAll('[data-swiper-slide-index="' + t.realIndex + '"]')
										.eq(0)
										.index(),
									o = a.slides
										.eq(r)
										.nextAll('[data-swiper-slide-index="' + t.realIndex + '"]')
										.eq(0)
										.index();
								n =
									void 0 === s
										? o
										: void 0 === o
										? s
										: o - r == r - s
										? r
										: o - r < r - s
										? o
										: s;
							} else n = t.realIndex;
							a.visibleSlidesIndexes &&
								a.visibleSlidesIndexes.indexOf(n) < 0 &&
								(a.params.centeredSlides
									? (n =
											r < n
												? n - Math.floor(i / 2) + 1
												: n + Math.floor(i / 2) - 1)
									: r < n && (n = n - i + 1),
								a.slideTo(n, e ? 0 : void 0));
						}
						var l = 1,
							d = t.params.thumbs.slideThumbActiveClass;
						if (
							(1 < t.params.slidesPerView &&
								!t.params.centeredSlides &&
								(l = t.params.slidesPerView),
							a.slides.removeClass(d),
							a.params.loop || a.params.virtual)
						)
							for (var c = 0; c < l; c += 1)
								a.$wrapperEl
									.children(
										'[data-swiper-slide-index="' + (t.realIndex + c) + '"]'
									)
									.addClass(d);
						else
							for (var u = 0; u < l; u += 1)
								a.slides.eq(t.realIndex + u).addClass(d);
					}
				},
			},
			te = [
				k,
				O,
				N,
				P,
				L,
				D,
				R,
				{
					name: 'mousewheel',
					params: {
						mousewheel: {
							enabled: !1,
							releaseOnEdges: !1,
							invert: !1,
							forceToAxis: !1,
							sensitivity: 1,
							eventsTarged: 'container',
						},
					},
					create: function () {
						var e = this;
						p.extend(e, {
							mousewheel: {
								enabled: !1,
								enable: $.enable.bind(e),
								disable: $.disable.bind(e),
								handle: $.handle.bind(e),
								handleMouseEnter: $.handleMouseEnter.bind(e),
								handleMouseLeave: $.handleMouseLeave.bind(e),
								lastScrollTime: p.now(),
							},
						});
					},
					on: {
						init: function () {
							this.params.mousewheel.enabled && this.mousewheel.enable();
						},
						destroy: function () {
							this.mousewheel.enabled && this.mousewheel.disable();
						},
					},
				},
				{
					name: 'navigation',
					params: {
						navigation: {
							nextEl: null,
							prevEl: null,
							hideOnClick: !1,
							disabledClass: 'swiper-button-disabled',
							hiddenClass: 'swiper-button-hidden',
							lockClass: 'swiper-button-lock',
						},
					},
					create: function () {
						var e = this;
						p.extend(e, {
							navigation: {
								init: B.init.bind(e),
								update: B.update.bind(e),
								destroy: B.destroy.bind(e),
								onNextClick: B.onNextClick.bind(e),
								onPrevClick: B.onPrevClick.bind(e),
							},
						});
					},
					on: {
						init: function () {
							this.navigation.init(), this.navigation.update();
						},
						toEdge: function () {
							this.navigation.update();
						},
						fromEdge: function () {
							this.navigation.update();
						},
						destroy: function () {
							this.navigation.destroy();
						},
						click: function (t) {
							var a,
								i = this,
								n = i.navigation,
								r = n.$nextEl,
								s = n.$prevEl;
							!i.params.navigation.hideOnClick ||
								e(t.target).is(s) ||
								e(t.target).is(r) ||
								(r
									? (a = r.hasClass(i.params.navigation.hiddenClass))
									: s && (a = s.hasClass(i.params.navigation.hiddenClass)),
								!0 === a
									? i.emit('navigationShow', i)
									: i.emit('navigationHide', i),
								r && r.toggleClass(i.params.navigation.hiddenClass),
								s && s.toggleClass(i.params.navigation.hiddenClass));
						},
					},
				},
				{
					name: 'pagination',
					params: {
						pagination: {
							el: null,
							bulletElement: 'span',
							clickable: !1,
							hideOnClick: !1,
							renderBullet: null,
							renderProgressbar: null,
							renderFraction: null,
							renderCustom: null,
							progressbarOpposite: !1,
							type: 'bullets',
							dynamicBullets: !1,
							dynamicMainBullets: 1,
							formatFractionCurrent: function (e) {
								return e;
							},
							formatFractionTotal: function (e) {
								return e;
							},
							bulletClass: 'swiper-pagination-bullet',
							bulletActiveClass: 'swiper-pagination-bullet-active',
							modifierClass: 'swiper-pagination-',
							currentClass: 'swiper-pagination-current',
							totalClass: 'swiper-pagination-total',
							hiddenClass: 'swiper-pagination-hidden',
							progressbarFillClass: 'swiper-pagination-progressbar-fill',
							progressbarOppositeClass:
								'swiper-pagination-progressbar-opposite',
							clickableClass: 'swiper-pagination-clickable',
							lockClass: 'swiper-pagination-lock',
						},
					},
					create: function () {
						var e = this;
						p.extend(e, {
							pagination: {
								init: H.init.bind(e),
								render: H.render.bind(e),
								update: H.update.bind(e),
								destroy: H.destroy.bind(e),
								dynamicBulletIndex: 0,
							},
						});
					},
					on: {
						init: function () {
							this.pagination.init(),
								this.pagination.render(),
								this.pagination.update();
						},
						activeIndexChange: function () {
							(this.params.loop || void 0 === this.snapIndex) &&
								this.pagination.update();
						},
						snapIndexChange: function () {
							this.params.loop || this.pagination.update();
						},
						slidesLengthChange: function () {
							this.params.loop &&
								(this.pagination.render(), this.pagination.update());
						},
						snapGridLengthChange: function () {
							this.params.loop ||
								(this.pagination.render(), this.pagination.update());
						},
						destroy: function () {
							this.pagination.destroy();
						},
						click: function (t) {
							var a = this;
							a.params.pagination.el &&
								a.params.pagination.hideOnClick &&
								0 < a.pagination.$el.length &&
								!e(t.target).hasClass(a.params.pagination.bulletClass) &&
								(!0 ===
								a.pagination.$el.hasClass(a.params.pagination.hiddenClass)
									? a.emit('paginationShow', a)
									: a.emit('paginationHide', a),
								a.pagination.$el.toggleClass(a.params.pagination.hiddenClass));
						},
					},
				},
				{
					name: 'scrollbar',
					params: {
						scrollbar: {
							el: null,
							dragSize: 'auto',
							hide: !1,
							draggable: !1,
							snapOnRelease: !0,
							lockClass: 'swiper-scrollbar-lock',
							dragClass: 'swiper-scrollbar-drag',
						},
					},
					create: function () {
						var e = this;
						p.extend(e, {
							scrollbar: {
								init: j.init.bind(e),
								destroy: j.destroy.bind(e),
								updateSize: j.updateSize.bind(e),
								setTranslate: j.setTranslate.bind(e),
								setTransition: j.setTransition.bind(e),
								enableDraggable: j.enableDraggable.bind(e),
								disableDraggable: j.disableDraggable.bind(e),
								setDragPosition: j.setDragPosition.bind(e),
								getPointerPosition: j.getPointerPosition.bind(e),
								onDragStart: j.onDragStart.bind(e),
								onDragMove: j.onDragMove.bind(e),
								onDragEnd: j.onDragEnd.bind(e),
								isTouched: !1,
								timeout: null,
								dragTimeout: null,
							},
						});
					},
					on: {
						init: function () {
							this.scrollbar.init(),
								this.scrollbar.updateSize(),
								this.scrollbar.setTranslate();
						},
						update: function () {
							this.scrollbar.updateSize();
						},
						resize: function () {
							this.scrollbar.updateSize();
						},
						observerUpdate: function () {
							this.scrollbar.updateSize();
						},
						setTranslate: function () {
							this.scrollbar.setTranslate();
						},
						setTransition: function (e) {
							this.scrollbar.setTransition(e);
						},
						destroy: function () {
							this.scrollbar.destroy();
						},
					},
				},
				{
					name: 'parallax',
					params: { parallax: { enabled: !1 } },
					create: function () {
						p.extend(this, {
							parallax: {
								setTransform: G.setTransform.bind(this),
								setTranslate: G.setTranslate.bind(this),
								setTransition: G.setTransition.bind(this),
							},
						});
					},
					on: {
						beforeInit: function () {
							this.params.parallax.enabled &&
								((this.params.watchSlidesProgress = !0),
								(this.originalParams.watchSlidesProgress = !0));
						},
						init: function () {
							this.params.parallax.enabled && this.parallax.setTranslate();
						},
						setTranslate: function () {
							this.params.parallax.enabled && this.parallax.setTranslate();
						},
						setTransition: function (e) {
							this.params.parallax.enabled && this.parallax.setTransition(e);
						},
					},
				},
				{
					name: 'zoom',
					params: {
						zoom: {
							enabled: !1,
							maxRatio: 3,
							minRatio: 1,
							toggle: !0,
							containerClass: 'swiper-zoom-container',
							zoomedSlideClass: 'swiper-slide-zoomed',
						},
					},
					create: function () {
						var e = this,
							t = {
								enabled: !1,
								scale: 1,
								currentScale: 1,
								isScaling: !1,
								gesture: {
									$slideEl: void 0,
									slideWidth: void 0,
									slideHeight: void 0,
									$imageEl: void 0,
									$imageWrapEl: void 0,
									maxRatio: 3,
								},
								image: {
									isTouched: void 0,
									isMoved: void 0,
									currentX: void 0,
									currentY: void 0,
									minX: void 0,
									minY: void 0,
									maxX: void 0,
									maxY: void 0,
									width: void 0,
									height: void 0,
									startX: void 0,
									startY: void 0,
									touchesStart: {},
									touchesCurrent: {},
								},
								velocity: {
									x: void 0,
									y: void 0,
									prevPositionX: void 0,
									prevPositionY: void 0,
									prevTime: void 0,
								},
							};
						'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'
							.split(' ')
							.forEach(function (a) {
								t[a] = q[a].bind(e);
							}),
							p.extend(e, { zoom: t });
						var a = 1;
						Object.defineProperty(e.zoom, 'scale', {
							get: function () {
								return a;
							},
							set: function (t) {
								if (a !== t) {
									var i = e.zoom.gesture.$imageEl
											? e.zoom.gesture.$imageEl[0]
											: void 0,
										n = e.zoom.gesture.$slideEl
											? e.zoom.gesture.$slideEl[0]
											: void 0;
									e.emit('zoomChange', t, i, n);
								}
								a = t;
							},
						});
					},
					on: {
						init: function () {
							this.params.zoom.enabled && this.zoom.enable();
						},
						destroy: function () {
							this.zoom.disable();
						},
						touchStart: function (e) {
							this.zoom.enabled && this.zoom.onTouchStart(e);
						},
						touchEnd: function (e) {
							this.zoom.enabled && this.zoom.onTouchEnd(e);
						},
						doubleTap: function (e) {
							this.params.zoom.enabled &&
								this.zoom.enabled &&
								this.params.zoom.toggle &&
								this.zoom.toggle(e);
						},
						transitionEnd: function () {
							this.zoom.enabled &&
								this.params.zoom.enabled &&
								this.zoom.onTransitionEnd();
						},
					},
				},
				{
					name: 'lazy',
					params: {
						lazy: {
							enabled: !1,
							loadPrevNext: !1,
							loadPrevNextAmount: 1,
							loadOnTransitionStart: !1,
							elementClass: 'swiper-lazy',
							loadingClass: 'swiper-lazy-loading',
							loadedClass: 'swiper-lazy-loaded',
							preloaderClass: 'swiper-lazy-preloader',
						},
					},
					create: function () {
						p.extend(this, {
							lazy: {
								initialImageLoaded: !1,
								load: F.load.bind(this),
								loadInSlide: F.loadInSlide.bind(this),
							},
						});
					},
					on: {
						beforeInit: function () {
							this.params.lazy.enabled &&
								this.params.preloadImages &&
								(this.params.preloadImages = !1);
						},
						init: function () {
							this.params.lazy.enabled &&
								!this.params.loop &&
								0 === this.params.initialSlide &&
								this.lazy.load();
						},
						scroll: function () {
							this.params.freeMode &&
								!this.params.freeModeSticky &&
								this.lazy.load();
						},
						resize: function () {
							this.params.lazy.enabled && this.lazy.load();
						},
						scrollbarDragMove: function () {
							this.params.lazy.enabled && this.lazy.load();
						},
						transitionStart: function () {
							var e = this;
							e.params.lazy.enabled &&
								((!e.params.lazy.loadOnTransitionStart &&
									(e.params.lazy.loadOnTransitionStart ||
										e.lazy.initialImageLoaded)) ||
									e.lazy.load());
						},
						transitionEnd: function () {
							this.params.lazy.enabled &&
								!this.params.lazy.loadOnTransitionStart &&
								this.lazy.load();
						},
					},
				},
				{
					name: 'controller',
					params: { controller: { control: void 0, inverse: !1, by: 'slide' } },
					create: function () {
						var e = this;
						p.extend(e, {
							controller: {
								control: e.params.controller.control,
								getInterpolateFunction: U.getInterpolateFunction.bind(e),
								setTranslate: U.setTranslate.bind(e),
								setTransition: U.setTransition.bind(e),
							},
						});
					},
					on: {
						update: function () {
							this.controller.control &&
								this.controller.spline &&
								((this.controller.spline = void 0),
								delete this.controller.spline);
						},
						resize: function () {
							this.controller.control &&
								this.controller.spline &&
								((this.controller.spline = void 0),
								delete this.controller.spline);
						},
						observerUpdate: function () {
							this.controller.control &&
								this.controller.spline &&
								((this.controller.spline = void 0),
								delete this.controller.spline);
						},
						setTranslate: function (e, t) {
							this.controller.control && this.controller.setTranslate(e, t);
						},
						setTransition: function (e, t) {
							this.controller.control && this.controller.setTransition(e, t);
						},
					},
				},
				{
					name: 'a11y',
					params: {
						a11y: {
							enabled: !0,
							notificationClass: 'swiper-notification',
							prevSlideMessage: 'Previous slide',
							nextSlideMessage: 'Next slide',
							firstSlideMessage: 'This is the first slide',
							lastSlideMessage: 'This is the last slide',
							paginationBulletMessage: 'Go to slide {{index}}',
						},
					},
					create: function () {
						var t = this;
						p.extend(t, {
							a11y: {
								liveRegion: e(
									'<span class="' +
										t.params.a11y.notificationClass +
										'" aria-live="assertive" aria-atomic="true"></span>'
								),
							},
						}),
							Object.keys(X).forEach(function (e) {
								t.a11y[e] = X[e].bind(t);
							});
					},
					on: {
						init: function () {
							this.params.a11y.enabled &&
								(this.a11y.init(), this.a11y.updateNavigation());
						},
						toEdge: function () {
							this.params.a11y.enabled && this.a11y.updateNavigation();
						},
						fromEdge: function () {
							this.params.a11y.enabled && this.a11y.updateNavigation();
						},
						paginationUpdate: function () {
							this.params.a11y.enabled && this.a11y.updatePagination();
						},
						destroy: function () {
							this.params.a11y.enabled && this.a11y.destroy();
						},
					},
				},
				{
					name: 'history',
					params: { history: { enabled: !1, replaceState: !1, key: 'slides' } },
					create: function () {
						var e = this;
						p.extend(e, {
							history: {
								init: V.init.bind(e),
								setHistory: V.setHistory.bind(e),
								setHistoryPopState: V.setHistoryPopState.bind(e),
								scrollToSlide: V.scrollToSlide.bind(e),
								destroy: V.destroy.bind(e),
							},
						});
					},
					on: {
						init: function () {
							this.params.history.enabled && this.history.init();
						},
						destroy: function () {
							this.params.history.enabled && this.history.destroy();
						},
						transitionEnd: function () {
							this.history.initialized &&
								this.history.setHistory(
									this.params.history.key,
									this.activeIndex
								);
						},
					},
				},
				{
					name: 'hash-navigation',
					params: {
						hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
					},
					create: function () {
						var e = this;
						p.extend(e, {
							hashNavigation: {
								initialized: !1,
								init: Y.init.bind(e),
								destroy: Y.destroy.bind(e),
								setHash: Y.setHash.bind(e),
								onHashCange: Y.onHashCange.bind(e),
							},
						});
					},
					on: {
						init: function () {
							this.params.hashNavigation.enabled && this.hashNavigation.init();
						},
						destroy: function () {
							this.params.hashNavigation.enabled &&
								this.hashNavigation.destroy();
						},
						transitionEnd: function () {
							this.hashNavigation.initialized && this.hashNavigation.setHash();
						},
					},
				},
				{
					name: 'autoplay',
					params: {
						autoplay: {
							enabled: !1,
							delay: 3e3,
							waitForTransition: !0,
							disableOnInteraction: !0,
							stopOnLastSlide: !1,
							reverseDirection: !1,
						},
					},
					create: function () {
						var e = this;
						p.extend(e, {
							autoplay: {
								running: !1,
								paused: !1,
								run: W.run.bind(e),
								start: W.start.bind(e),
								stop: W.stop.bind(e),
								pause: W.pause.bind(e),
								onTransitionEnd: function (t) {
									e &&
										!e.destroyed &&
										e.$wrapperEl &&
										t.target === this &&
										(e.$wrapperEl[0].removeEventListener(
											'transitionend',
											e.autoplay.onTransitionEnd
										),
										e.$wrapperEl[0].removeEventListener(
											'webkitTransitionEnd',
											e.autoplay.onTransitionEnd
										),
										(e.autoplay.paused = !1),
										e.autoplay.running ? e.autoplay.run() : e.autoplay.stop());
								},
							},
						});
					},
					on: {
						init: function () {
							this.params.autoplay.enabled && this.autoplay.start();
						},
						beforeTransitionStart: function (e, t) {
							this.autoplay.running &&
								(t || !this.params.autoplay.disableOnInteraction
									? this.autoplay.pause(e)
									: this.autoplay.stop());
						},
						sliderFirstMove: function () {
							this.autoplay.running &&
								(this.params.autoplay.disableOnInteraction
									? this.autoplay.stop()
									: this.autoplay.pause());
						},
						destroy: function () {
							this.autoplay.running && this.autoplay.stop();
						},
					},
				},
				{
					name: 'effect-fade',
					params: { fadeEffect: { crossFade: !1 } },
					create: function () {
						p.extend(this, {
							fadeEffect: {
								setTranslate: K.setTranslate.bind(this),
								setTransition: K.setTransition.bind(this),
							},
						});
					},
					on: {
						beforeInit: function () {
							var e = this;
							if ('fade' === e.params.effect) {
								e.classNames.push(e.params.containerModifierClass + 'fade');
								var t = {
									slidesPerView: 1,
									slidesPerColumn: 1,
									slidesPerGroup: 1,
									watchSlidesProgress: !0,
									spaceBetween: 0,
									virtualTranslate: !0,
								};
								p.extend(e.params, t), p.extend(e.originalParams, t);
							}
						},
						setTranslate: function () {
							'fade' === this.params.effect && this.fadeEffect.setTranslate();
						},
						setTransition: function (e) {
							'fade' === this.params.effect && this.fadeEffect.setTransition(e);
						},
					},
				},
				{
					name: 'effect-cube',
					params: {
						cubeEffect: {
							slideShadows: !0,
							shadow: !0,
							shadowOffset: 20,
							shadowScale: 0.94,
						},
					},
					create: function () {
						p.extend(this, {
							cubeEffect: {
								setTranslate: Z.setTranslate.bind(this),
								setTransition: Z.setTransition.bind(this),
							},
						});
					},
					on: {
						beforeInit: function () {
							var e = this;
							if ('cube' === e.params.effect) {
								e.classNames.push(e.params.containerModifierClass + 'cube'),
									e.classNames.push(e.params.containerModifierClass + '3d');
								var t = {
									slidesPerView: 1,
									slidesPerColumn: 1,
									slidesPerGroup: 1,
									watchSlidesProgress: !0,
									resistanceRatio: 0,
									spaceBetween: 0,
									centeredSlides: !1,
									virtualTranslate: !0,
								};
								p.extend(e.params, t), p.extend(e.originalParams, t);
							}
						},
						setTranslate: function () {
							'cube' === this.params.effect && this.cubeEffect.setTranslate();
						},
						setTransition: function (e) {
							'cube' === this.params.effect && this.cubeEffect.setTransition(e);
						},
					},
				},
				{
					name: 'effect-flip',
					params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
					create: function () {
						p.extend(this, {
							flipEffect: {
								setTranslate: Q.setTranslate.bind(this),
								setTransition: Q.setTransition.bind(this),
							},
						});
					},
					on: {
						beforeInit: function () {
							var e = this;
							if ('flip' === e.params.effect) {
								e.classNames.push(e.params.containerModifierClass + 'flip'),
									e.classNames.push(e.params.containerModifierClass + '3d');
								var t = {
									slidesPerView: 1,
									slidesPerColumn: 1,
									slidesPerGroup: 1,
									watchSlidesProgress: !0,
									spaceBetween: 0,
									virtualTranslate: !0,
								};
								p.extend(e.params, t), p.extend(e.originalParams, t);
							}
						},
						setTranslate: function () {
							'flip' === this.params.effect && this.flipEffect.setTranslate();
						},
						setTransition: function (e) {
							'flip' === this.params.effect && this.flipEffect.setTransition(e);
						},
					},
				},
				{
					name: 'effect-coverflow',
					params: {
						coverflowEffect: {
							rotate: 50,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: !0,
						},
					},
					create: function () {
						p.extend(this, {
							coverflowEffect: {
								setTranslate: J.setTranslate.bind(this),
								setTransition: J.setTransition.bind(this),
							},
						});
					},
					on: {
						beforeInit: function () {
							var e = this;
							'coverflow' === e.params.effect &&
								(e.classNames.push(
									e.params.containerModifierClass + 'coverflow'
								),
								e.classNames.push(e.params.containerModifierClass + '3d'),
								(e.params.watchSlidesProgress = !0),
								(e.originalParams.watchSlidesProgress = !0));
						},
						setTranslate: function () {
							'coverflow' === this.params.effect &&
								this.coverflowEffect.setTranslate();
						},
						setTransition: function (e) {
							'coverflow' === this.params.effect &&
								this.coverflowEffect.setTransition(e);
						},
					},
				},
				{
					name: 'thumbs',
					params: {
						thumbs: {
							swiper: null,
							slideThumbActiveClass: 'swiper-slide-thumb-active',
							thumbsContainerClass: 'swiper-container-thumbs',
						},
					},
					create: function () {
						p.extend(this, {
							thumbs: {
								swiper: null,
								init: ee.init.bind(this),
								update: ee.update.bind(this),
								onThumbClick: ee.onThumbClick.bind(this),
							},
						});
					},
					on: {
						beforeInit: function () {
							var e = this.params.thumbs;
							e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
						},
						slideChange: function () {
							this.thumbs.swiper && this.thumbs.update();
						},
						update: function () {
							this.thumbs.swiper && this.thumbs.update();
						},
						resize: function () {
							this.thumbs.swiper && this.thumbs.update();
						},
						observerUpdate: function () {
							this.thumbs.swiper && this.thumbs.update();
						},
						setTransition: function (e) {
							var t = this.thumbs.swiper;
							t && t.setTransition(e);
						},
						beforeDestroy: function () {
							var e = this.thumbs.swiper;
							e && this.thumbs.swiperCreated && e && e.destroy();
						},
					},
				},
			];
		return (
			void 0 === M.use &&
				((M.use = M.Class.use), (M.installModule = M.Class.installModule)),
			M.use(te),
			M
		);
	});
const toggle = () => {
	let e = document.querySelectorAll('[data-toggle]');
	for (let t = 0; t < e.length; t++)
		e[t].addEventListener('click', () => {
			let a = document.querySelector(e[t].getAttribute('data-toggle'));
			a && a.classList.toggle('is-active'),
				'.affiliate__table--requirements' ===
					e[t].getAttribute('data-toggle') &&
					(e[t].querySelector('span').textContent =
						'Show Tier Requirements' === e[t].querySelector('span').textContent
							? 'Hide Tier Requirements'
							: 'Show Tier Requirements'),
				e[t].classList.toggle('is-active');
		});
};
window.addEventListener('load', toggle);
const sticky = () => {
	let e = document.querySelector('.bar'),
		t = document.querySelector('.header'),
		a = e ? e.offsetHeight : null;
	window.pageYOffset > a
		? t.classList.add('is-sticky')
		: t.classList.remove('is-sticky');
};
window.addEventListener('load', sticky),
	window.addEventListener('scroll', sticky),
	window.addEventListener('resize', sticky);
const height = () => {
	if (window.innerWidth < 992) {
		let e,
			t = document.querySelector('.header').getBoundingClientRect();
		document.documentElement.style.setProperty(
			'--vh-window',
			window.innerHeight + 'px'
		),
			document.documentElement.style.setProperty('--vh-rect', t.top + 'px');
	}
};
window.addEventListener('load', height);
const throttle = () => {
	let e = null;
	e ||
		(e = setTimeout(() => {
			(e = null), height();
		}, 300));
};
window.addEventListener('scroll', throttle),
	window.addEventListener('resize', throttle);
const swiperQuote = new Swiper('.swiper--quote', {
		autoplay: { delay: 1e4, disableOnInteraction: !1 },
		loop: !0,
		loopAdditionalSlides: 2,
		slideActiveClass: 'is-active',
		slideClass: 'swiper__slide',
		speed: 600,
		wrapperClass: 'swiper__slides',
	}),
	customersLogo = document.querySelectorAll('.customers__tabs-logo'),
	customersTab = document.querySelectorAll('.customers__tab');
for (let e = 0; e < customersLogo.length; e++)
	customersLogo[e].addEventListener('click', () => {
		for (let e = 0; e < customersLogo.length; e++)
			customersLogo[e].classList.remove('is-active'),
				customersTab[e].classList.remove('is-active');
		customersLogo[e].classList.add('is-active'),
			customersTab[e].classList.add('is-active');
	});
const planToggle = document.querySelectorAll('.plan__toggle-checkbox'),
	planPrice = document.querySelectorAll('.card .plan__price'),
	planButton = document.querySelectorAll('.card .button[data-annually]'),
	planRibbon = document.querySelectorAll('.card .plan--ribbon');
for (let e = 0; e < planToggle.length; e++)
	planToggle[e].addEventListener('change', () => {
		for (let t = 0; t < planToggle.length; t++)
			planToggle[t].checked = planToggle[e].checked;
		for (let e = 0; e < planPrice.length; e++)
			planPrice[e].classList.toggle('is-monthly');
		for (let e = 0; e < planButton.length; e++)
			planButton[e].setAttribute(
				'href',
				planButton[e].getAttribute('href') ===
					planButton[e].getAttribute('data-annually')
					? planButton[e].getAttribute('data-monthly')
					: planButton[e].getAttribute('data-annually')
			);
		for (let e = 0; e < planRibbon.length; e++)
			planRibbon[e].classList.toggle('is-monthly');
	});
if (!Cookies.get('modal--exit')) {
	const e = document.querySelector('.modal--exit');
	e &&
		document.addEventListener('mouseout', t => {
			null === t.toElement &&
				null === t.relatedTarget &&
				(e.classList.contains('is-showed') ||
					setTimeout(() => {
						Cookies.set('modal--exit', 'showed', { expires: 1 }),
							e.classList.add('is-active', 'is-showed');
					}, 1e3));
		});
}
const tooltipButton = document.querySelectorAll('[data-tooltip]'),
	tooltipElement = document.querySelectorAll('.tooltip'),
	tooltipInstance = [];
for (let e = 0; e < tooltipButton.length; e++) {
	function tooltipCreate() {
		tooltipInstance[e] = Popper.createPopper(
			tooltipButton[e],
			tooltipElement[e],
			{ modifiers: [{ name: 'offset', options: { offset: [0, 16] } }] }
		);
	}
	function tooltipDestroy() {
		tooltipInstance[e] &&
			(tooltipInstance[e].destroy(), (tooltipInstance[e] = null));
	}
	function tooltipShow() {
		tooltipElement[e].classList.add('is-active'), tooltipCreate();
	}
	function tooltipHide() {
		tooltipElement[e].classList.remove('is-active'), tooltipDestroy();
	}
	(tooltipInstance[e] = null),
		tooltipButton[e].addEventListener('mouseenter', tooltipShow),
		tooltipButton[e].addEventListener('mouseleave', tooltipHide);
}
const scroll = new SmoothScroll(),
	scrollAnchor = document.getElementById('compare'),
	scrollToggle = document.querySelector('a[href="#compare"]'),
	scrollHeader = document.querySelector('.header'),
	scrollOptions = { offset: () => scrollHeader.offsetHeight, updateURL: !1 };
scrollAnchor &&
	scrollToggle &&
	scrollToggle.addEventListener('click', e => {
		e.preventDefault(),
			scroll.animateScroll(scrollAnchor, scrollToggle, scrollOptions);
	}),
	document.querySelectorAll('pre code').forEach(e => {
		hljs.highlightBlock(e);
	});
