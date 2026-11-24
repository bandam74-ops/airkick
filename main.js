(() => {
  // ---------- History data (포트폴리오 · 주요 연혁 기반) ----------
  const HISTORY = {
    2004: ['무도태권도로 돌아가기 DVD 기획, 주연'],
    2006: ['미국 에어킥 세미나'],
    2007: ['발차기의 혁명(AIR KICK) DVD 출시', '한국태권도컨설팅 에어킥 세미나'],
    2008: ['네오블랙벨트 에어킥 세미나'],
    2009: ['TA-1 온라인 커뮤니티 개설', '제3회 전국태권도장경진대회 금상 수상', '태권도시범 단계별 지도법 개발'],
    2010: ['AIR KICK 온라인 카페(커뮤니티) 개설'],
    2012: ['에어킥 상표 출원', '에어킥 앱 출시 — 영상콘텐츠진흥원 지원사업 선정', '박동영 교수의 시범단 지도법 연재 · 무카스 지원 15부작 제작 보급', '수원지역 지도자 대상 에어킥 세미나 3회차', '대만 태권도 지도자 에어킥 세미나 3회차', '충주 태권도 지도자 에어킥 마스터과정 4회차', '국기원 해외파견 사범 태권도시범 지도'],
    2013: ['<em>4월</em>창업선도대학 육성사업 창업사업화지원 선정 — AIRKICK 국내외 보급용 태권도 교육 콘텐츠', '에어킥 두 번째 DVD 출시', '<em>12월</em>문화관광부 체육발전 공로상 수상', '한국-베트남 수교 20주년(베트남 오페라극장) 문광부 행사 지도안무', 'TA-1 사업자 등록 · TA-1 상표 출원', '참교육 지도자 에어킥 세미나', '진주지역 지도자 에어킥 마스터과정 3회차', '순천시범단 태권도시범 지도', '중국(서호) 에어킥 마스터과정'],
    2014: ['TA-1 어플리케이션 제작 · 에어킥 지도법', '카자흐스탄 초청 태권도 시범지도', '한중 에어킥 캠프'],
    2015: ['태권도엑스포 다국적 외국인 태권도시범 지도', '중국(제남) 초청 에어킥 전문과정', '중국 초청 태권도시범 지도', '미국 월드챔피언 지도자 대상 에어킥 지도'],
    2016: ['에어킥 키즈 온라인 카페 개설', '인도네시아 자와바랏 대표팀 시범지도', '헝가리 대표팀 태권도시범 지도'],
    2017: ['TA-1 차이나 태권도장 오픈(중국)'],
    2018: ['대한체육회 체육발전공로상 수상 (제64회 대한체육회 체육상)', '<em>5월</em>TA-1 법인 설립', '건군 70주년 국군의날 태권도시범 자문, 기술 지도', '대만 대표팀 태권도시범 지도', '인도네시아 대표팀 태권도시범 지도(한국, 인도네시아)', '2018 자카르타 아시안게임 개회식 시범지도 코치'],
    2019: ['<em>1월</em>제1회 에어킥 트레이닝 파티', '<em>2월</em>중국(제남) 에어킥 시범단 선발을 위한 세미나', '<em>3월</em>특수특전단 해외 파병부대 파병관 시범 지도', '<em>4월</em>제2회 에어킥 트레이닝 파티(중국)', '<em>6월</em>제3회 에어킥 트레이닝 파티(레전드 파티)', '<em>9월</em>태권도 페스티벌 대회 총괄'],
    2020: ['(재)충남문화산업진흥원 시제품제작 지원사업 선정', '(재)충남문화산업진흥원 5차년도 수요형마케팅 지원사업 선정', '충남콘텐츠코리아랩 크리에이터 1기 육성 지원사업 선정'],
    2021: ['(재)충남문화산업진흥원 2021 수요형마케팅 지원사업 선정', '충남콘텐츠코리아랩 크리에이터 2기 육성 지원사업 선정'],
  };

  const years = Object.keys(HISTORY).sort((a, b) => b - a);
  const tl = document.getElementById('timeline');
  const yb = document.getElementById('years');

  years.forEach((y) => {
    const li = document.createElement('li');
    li.className = 'tl-year';
    li.id = 'y' + y;
    li.innerHTML = `<h3>${y}</h3><ul>${HISTORY[y].map((t) => `<li>${t}</li>`).join('')}</ul>`;
    tl.appendChild(li);

    const b = document.createElement('button');
    b.textContent = y;
    b.addEventListener('click', () => {
      tl.classList.remove('is-collapsed');
      moreBtn.remove();
      document.getElementById('y' + y).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    yb.appendChild(b);
  });

  tl.classList.add('is-collapsed');
  const moreBtn = document.createElement('button');
  moreBtn.className = 'btn btn--ghost tl-more';
  moreBtn.textContent = '전체 연혁 보기';
  moreBtn.addEventListener('click', () => { tl.classList.remove('is-collapsed'); moreBtn.remove(); });
  tl.after(moreBtn);

  // ---------- Nav ----------
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('#navLinks a').forEach((a) =>
    a.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', false); })
  );

  // ---------- Reveal + counters + timeline highlight ----------
  const countUp = (el) => {
    const target = +el.dataset.count;
    const start = target > 1000 ? target - 30 : 0;
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in', 'is-seen');
        const c = e.target.querySelector('[data-count]');
        if (c) countUp(c);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal, .tl-year').forEach((el) => io.observe(el));

    const yio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const y = e.target.id.slice(1);
        yb.querySelectorAll('button').forEach((b) => b.classList.toggle('is-active', b.textContent === y));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.tl-year').forEach((el) => yio.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll('[data-count]').forEach((el) => (el.textContent = el.dataset.count));
  }

  // ---------- Tabs ----------
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => {
        const on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on);
        const panel = document.getElementById(t.dataset.tab);
        panel.hidden = !on;
      });
    });
  });

  // ---------- Lightbox ----------
  const figs = [...document.querySelectorAll('#grid figure')];
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('figcaption');
  let idx = 0;
  const show = (i) => {
    idx = (i + figs.length) % figs.length;
    const img = figs[idx].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = figs[idx].querySelector('figcaption').textContent;
  };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; };
  figs.forEach((f, i) => f.addEventListener('click', () => { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }));
  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__prev').addEventListener('click', (e) => { e.stopPropagation(); show(idx - 1); });
  lb.querySelector('.lightbox__next').addEventListener('click', (e) => { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
