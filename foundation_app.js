const { useState, useEffect } = React;

const domains = [
  { id:"mol", emoji:"🧬", title:"Molecular & Cell Biology", subtitle:"The biological foundation", color:"#10B981", bg:"#10B98112", border:"#10B98130", level:"FOUNDATION", description:"Master the core language of modern biology. Without this, everything else (sequencing, computation, AI) loses its meaning. Start here.", tracks:[
    { name:"Cell Biology Fundamentals", timeframe:"Weeks 1–3", effort:"~3h/week", resources:[
      { title:"Molecular Biology of the Cell - Alberts et al.", type:"Textbook", free:true, url:"https://www.ncbi.nlm.nih.gov/books/NBK21054/", note:"Free via NCBI. The standard reference. Ch. 1–8 minimum." },
      { title:"MIT OCW 7.016 Introductory Biology", type:"Course", free:true, url:"https://ocw.mit.edu/courses/7-016-introductory-biology-fall-2018/", note:"Full lecture series. Watch at 1.5×. Rigorous but accessible." },
      { title:"Crash Course Biology (YouTube)", type:"Video", free:true, url:"https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF", note:"Fast revision of core concepts. Great for gaps." }
    ], skills:["Cell cycle & checkpoints","DNA replication & repair","Transcription & translation","Cell signaling pathways","Membrane biology & organelles"] },
    { name:"Genetics & Genomics", timeframe:"Weeks 2–6", effort:"~4h/week", resources:[
      { title:"Introduction to Genomics - Coursera (Johns Hopkins)", type:"Course", free:true, url:"https://www.coursera.org/learn/introduction-genomics", note:"Audit for free. Covers sequencing, variant calling, population genetics." },
      { title:"Lewin's Genes XII", type:"Textbook", free:false, url:"https://www.amazon.com/Lewins-Genes-XII-Jocelyn-Krebs/dp/1284104494", note:"Focus on gene regulation and epigenetics chapters." },
      { title:"Khan Academy Genetics", type:"Free", free:true, url:"https://www.khanacademy.org/science/ap-biology/heredity", note:"Excellent for solidifying inheritance and Mendelian foundations." }
    ], skills:["Mendelian → complex inheritance","Epigenetics & chromatin remodeling","SNP, indel, CNV concepts","Gene regulatory networks","GWAS & polygenic risk basics"] },
    { name:"Single-Cell & Transcriptomics", timeframe:"Weeks 6–12", effort:"~4h/week", resources:[
      { title:"Orchestrating Single-Cell Analysis (OSCA)", type:"Free Book", free:true, url:"https://bioconductor.org/books/release/OSCA/", note:"The definitive scRNA-seq reference. Bioconductor-based. Bookmark this." },
      { title:"Hemberg Lab scRNA-seq Course", type:"Course", free:true, url:"https://www.singlecellcourse.org/", note:"Theory + practice combined. Excellent structure." },
      { title:"Current Best Practices in scRNA-seq (Luecken & Theis 2019)", type:"Paper", free:true, url:"https://www.embopress.org/doi/full/10.15252/msb.20188746", note:"Essential reading - outlines the full analysis pipeline." }
    ], skills:["10x Chromium library prep concepts","Clustering & dimensionality reduction","Pseudotime & trajectory analysis","Differential expression testing","Cell type annotation strategies"] }
  ]},
  { id:"math", emoji:"∑", title:"Mathematics", subtitle:"The hidden engine", color:"#6366F1", bg:"#6366F112", border:"#6366F130", level:"CRITICAL", description:"Most bioinformatics mistakes happen because researchers don't understand the math in their tools. Linear algebra, probability, and statistics are non-negotiable.", tracks:[
    { name:"Linear Algebra", timeframe:"Weeks 1–4", effort:"~3h/week", resources:[
      { title:"3Blue1Brown - Essence of Linear Algebra", type:"Video", free:true, url:"https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", note:"The best visual intuition available. Watch before anything else." },
      { title:"MIT 18.06 Linear Algebra - Gilbert Strang", type:"Course", free:true, url:"https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", note:"Gold standard. Full lectures + problem sets. Free via MIT OCW." },
      { title:"Immersive Linear Algebra (interactive textbook)", type:"Free", free:true, url:"http://immersivemath.com/ila/index.html", note:"Interactive, visual companion - especially good for eigenvectors." }
    ], skills:["Matrix operations & factorizations","SVD & PCA (critical for omics)","Eigenvalues & eigenvectors","Vector spaces & projections","Least squares solutions"] },
    { name:"Probability & Statistics", timeframe:"Weeks 3–8", effort:"~4h/week", resources:[
      { title:"StatQuest with Josh Starmer (YouTube)", type:"Video", free:true, url:"https://www.youtube.com/@statquest", note:"Bioinformatics-specific stats explained with extraordinary clarity. Essential." },
      { title:"Probability for Data Science - UC Berkeley Prob140", type:"Free Book", free:true, url:"http://prob140.org/textbook/content/README.html", note:"Rigorous Bayesian foundations. Free online textbook." },
      { title:"An Introduction to Statistical Learning (ISLR)", type:"Free Book", free:true, url:"https://www.statlearning.com/", note:"Canonical ML+stats reference. Free PDF. R and Python editions." }
    ], skills:["Bayes theorem & posterior inference","Hypothesis testing & p-values","Multiple testing correction (FDR, Bonferroni)","Regression models (linear, logistic, Cox)","Distributions & sampling theory"] },
    { name:"Calculus & Optimization", timeframe:"Weeks 5–10", effort:"~3h/week", resources:[
      { title:"3Blue1Brown - Essence of Calculus", type:"Video", free:true, url:"https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", note:"Build intuition before formulas. Watch all 11 episodes." },
      { title:"Khan Academy Multivariable Calculus", type:"Free", free:true, url:"https://www.khanacademy.org/math/multivariable-calculus", note:"Gradients and partial derivatives matter for ML theory." },
      { title:"Convex Optimization - Boyd & Vandenberghe", type:"Free Book", free:true, url:"https://web.stanford.edu/~boyd/cvxbook/", note:"Free PDF. Foundational for understanding ML objective functions." }
    ], skills:["Derivatives & gradients","Chain rule (backpropagation foundation)","Partial derivatives & Jacobians","Gradient descent optimization","Constrained optimization basics"] }
  ]},
  { id:"ai", emoji:"🤖", title:"AI & Machine Learning", subtitle:"The analytical engine", color:"#F43F5E", bg:"#F43F5E12", border:"#F43F5E30", level:"STRATEGIC", description:"Modern biology is inseparable from ML. You need to understand models well enough to choose them, critique them, and build on them - not just run pipelines.", tracks:[
    { name:"Machine Learning Foundations", timeframe:"Weeks 4–8", effort:"~4h/week", resources:[
      { title:"fast.ai - Practical Deep Learning for Coders", type:"Course", free:true, url:"https://course.fast.ai/", note:"Top-down, code-first approach. Best for people who learn by doing." },
      { title:"Machine Learning Specialization - Andrew Ng (Coursera)", type:"Course", free:true, url:"https://www.coursera.org/specializations/machine-learning-introduction", note:"Audit free. Broad foundations, excellent explanations." },
      { title:"An Introduction to Statistical Learning (ISLR)", type:"Free Book", free:true, url:"https://www.statlearning.com/", note:"Overlaps with stats track - read the ML chapters here." }
    ], skills:["Supervised vs unsupervised learning","Cross-validation & regularization","Decision trees → ensemble methods","Dimensionality reduction (PCA, UMAP, t-SNE)","Model evaluation metrics"] },
    { name:"Deep Learning & Neural Networks", timeframe:"Weeks 7–12", effort:"~4h/week", resources:[
      { title:"Deep Learning Specialization - Andrew Ng (Coursera)", type:"Course", free:true, url:"https://www.coursera.org/specializations/deep-learning", note:"Covers CNNs, RNNs, and transformers. Audit free." },
      { title:"The Annotated Transformer (Harvard NLP)", type:"Tutorial", free:true, url:"https://nlp.seas.harvard.edu/2018/04/03/attention.html", note:"Line-by-line implementation of the transformer. Understand attention deeply." },
      { title:"Dive into Deep Learning (d2l.ai)", type:"Free Book", free:true, url:"https://d2l.ai/", note:"Interactive. PyTorch throughout. Excellent for hands-on learners." }
    ], skills:["Feedforward & recurrent networks","Convolutional networks for sequences","Attention & transformer architecture","Transfer learning & fine-tuning","Regularization & batch normalization"] },
    { name:"AI for Biology", timeframe:"Weeks 10–16", effort:"~4h/week", resources:[
      { title:"Causal Inference: The Mixtape - Cunningham", type:"Free Book", free:true, url:"https://mixtape.scunning.com/", note:"Accessible causal inference. Critical for interpreting biological experiments." },
      { title:"scVI paper - Lopez et al. 2018 (Nature Methods)", type:"Paper", free:true, url:"https://www.nature.com/articles/s41592-018-0229-2", note:"Variational autoencoders for scRNA-seq. Foundational in the field." },
      { title:"AlphaFold2 paper (Jumper et al. 2021)", type:"Paper", free:true, url:"https://www.nature.com/articles/s41586-021-03819-2", note:"Read to understand how DL redefined structural biology." }
    ], skills:["Causal DAGs & intervention logic","Graph neural networks for biology","Variational autoencoders (scVI, scANVI)","Protein structure prediction concepts","Perturbation modeling (CellOracle, SCENIC)"] }
  ]},
  { id:"code", emoji:"⌨️", title:"Scientific Computing", subtitle:"Your laboratory tools", color:"#F59E0B", bg:"#F59E0B12", border:"#F59E0B30", level:"CORE", description:"Code is the lab bench of computational biology. Python and R are equally important. Reproducibility is not optional; it's professional hygiene.", tracks:[
    { name:"Python for Research", timeframe:"Weeks 1–4", effort:"~3h/week", resources:[
      { title:"Scientific Python Lectures", type:"Free", free:true, url:"https://lectures.scientific-python.org/", note:"NumPy, SciPy, matplotlib: the scientific stack. Essential reference." },
      { title:"The Missing Semester of CS - MIT", type:"Course", free:true, url:"https://missing.csail.mit.edu/", note:"Shell, Git, editors, debugging. Every researcher needs this." },
      { title:"Snakemake Tutorial", type:"Tutorial", free:true, url:"https://snakemake.readthedocs.io/en/stable/tutorial/tutorial.html", note:"Reproducible bioinformatics pipelines. Expected in any serious lab." }
    ], skills:["NumPy vectorized computation","Pandas for tabular data","Reproducible Jupyter notebooks","Snakemake/Nextflow workflows","Conda environment management"] },
    { name:"R for Bioinformatics", timeframe:"Weeks 3–8", effort:"~4h/week", resources:[
      { title:"R for Data Science - Hadley Wickham", type:"Free Book", free:true, url:"https://r4ds.had.co.nz/", note:"Learn tidyverse properly. Non-negotiable if you'll use Bioconductor." },
      { title:"RNA-seq workflow - Bioconductor (limma/DESeq2)", type:"Tutorial", free:true, url:"https://bioconductor.org/packages/release/workflows/vignettes/RNAseq123/inst/doc/limmaWorkflow.html", note:"Lab-standard differential expression analysis pipeline." },
      { title:"Data Analysis for Life Sciences - Irizarry & Love", type:"Free", free:true, url:"https://rafalab.github.io/pages/harvardx.html", note:"Free HarvardX course series. R-based. World-class instructors." }
    ], skills:["ggplot2 & publication-quality figures","DESeq2 & edgeR for differential expression","Seurat for scRNA-seq analysis","Bioconductor package ecosystem","R Markdown for reproducible reports"] },
    { name:"HPC & Linux", timeframe:"Weeks 4–8", effort:"~2h/week", resources:[
      { title:"Software Carpentry - Shell, Git & Python", type:"Tutorial", free:true, url:"https://software-carpentry.org/lessons/", note:"Hands-on, biology-focused. Workshop-style. Free online." },
      { title:"Introduction to SLURM (HPC job scheduler)", type:"Tutorial", free:true, url:"https://slurm.schedmd.com/quickstart.html", note:"Most university and institute clusters use SLURM. Learn this before you arrive." },
      { title:"Docker for Bioinformatics - BioContainers", type:"Tutorial", free:true, url:"https://biocontainers.pro/", note:"Containerization = reproducibility. Required for serious pipelines." }
    ], skills:["Bash scripting & automation","SLURM job submission & monitoring","Git version control & collaboration","Docker/Singularity containers","tmux & remote server workflows"] }
  ]},
  { id:"writing", emoji:"✍️", title:"Scientific Writing", subtitle:"Your voice in the field", color:"#06B6D4", bg:"#06B6D412", border:"#06B6D430", level:"HIGH", description:"Most researchers write poorly because they were never taught. A clear, precise scientific paper is a skill that can be learned systematically, and it dramatically affects your career.", tracks:[
    { name:"Reading Papers Efficiently", timeframe:"Week 1 onward", effort:"~2h/week", resources:[
      { title:"How to Read a Paper - S. Keshav", type:"Free PDF", free:true, url:"https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf", note:"2-page guide. The 3-pass method. Read this today, before anything else." },
      { title:"Connected Papers", type:"Tool", free:true, url:"https://www.connectedpapers.com/", note:"Visualize citation networks around key papers in your field." },
      { title:"Semantic Scholar", type:"Tool", free:true, url:"https://www.semanticscholar.org/", note:"Set citation alerts for key authors. Stay current automatically." }
    ], skills:["3-pass reading method","Identifying contribution vs. incremental work","Critical appraisal of methods sections","Building an annotated literature library","Summarizing papers in 5 sentences"] },
    { name:"Paper Structure & Prose", timeframe:"Weeks 6–10", effort:"~3h/week", resources:[
      { title:"Writing in the Sciences - Coursera (Stanford)", type:"Course", free:true, url:"https://www.coursera.org/learn/sciwrite", note:"Kristin Sainani's course. Transformative. The single best writing course for scientists." },
      { title:"The Craft of Scientific Writing - Michael Alley", type:"Textbook", free:false, url:"https://www.amazon.com/Craft-Scientific-Writing-Michael-Alley/dp/1441982876", note:"Authoritative reference. Focus on clarity and precision." },
      { title:"Nature: How to write a first-class paper", type:"Free", free:true, url:"https://www.nature.com/articles/d41586-018-02404-4", note:"Direct advice from Nature editors. Short and worth reading." }
    ], skills:["IMRAD structure","Writing tight abstracts","Figure legends that stand alone","Eliminating redundant passive voice","Claims-to-evidence ratio clarity"] },
    { name:"Reference Management & Submission", timeframe:"Weeks 2–4 (setup) + ongoing", effort:"~1h/week", resources:[
      { title:"Zotero Reference Manager", type:"Tool", free:true, url:"https://www.zotero.org/", note:"Start your literature database now. Organize by topic/project from day 1." },
      { title:"EQUATOR Network - Reporting Guidelines", type:"Resource", free:true, url:"https://www.equator-network.org/", note:"STROBE, CONSORT, MIQE: know the reporting standard for your study type." },
      { title:"bioRxiv Preprint Server", type:"Resource", free:true, url:"https://www.biorxiv.org/", note:"Preprints are standard in biology now. Understand the workflow." }
    ], skills:["Zotero cite-while-you-write","CSL citation styles","Reporting guideline compliance","Preprint vs. journal strategy","Responding to peer review"] }
  ]},
  { id:"research", emoji:"🔬", title:"Research Practice", subtitle:"How science actually works", color:"#EC4899", bg:"#EC489912", border:"#EC489930", level:"HIGH", description:"Domain knowledge alone doesn't make a researcher. The meta-skills (designing experiments, presenting findings, asking the right question) are what separate contributors from consumers.", tracks:[
    { name:"Experiment Design & Hypothesis", timeframe:"Weeks 4–7", effort:"~2h/week", resources:[
      { title:"Experimental Design in Biology - HHMI BioInteractive", type:"Free", free:true, url:"https://www.biointeractive.org/classroom-resources/experimental-design-biology", note:"Visual, rigorous, accessible. Covers controls, variables, and reproducibility." },
      { title:"Think Bayes - Allen Downey", type:"Free Book", free:true, url:"https://greenteapress.com/wp/think-bayes/", note:"Bayesian thinking applied to real experimental reasoning." },
      { title:"How to Design a Good Experiment - Nature Methods", type:"Free", free:true, url:"https://www.nature.com/articles/nmeth.2613", note:"Brief but authoritative guidance on statistical power and sample size." }
    ], skills:["Hypothesis formulation (falsifiable, specific)","Control experiment design","Sample size & statistical power","Reproducibility and replication","Confounding variable identification"] },
    { name:"Literature Review & Synthesis", timeframe:"Weeks 2–8", effort:"~2h/week", resources:[
      { title:"PubMed Advanced Search", type:"Tool", free:true, url:"https://pubmed.ncbi.nlm.nih.gov/advanced/", note:"Master Boolean operators and MeSH terms. Systematic searching is a skill." },
      { title:"Rayyan - Systematic Review Tool", type:"Tool", free:true, url:"https://www.rayyan.ai/", note:"Free for researchers. Collaborate on abstract screening." },
      { title:"Ten Simple Rules for Writing a Literature Review - PLoS", type:"Free", free:true, url:"https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003149", note:"Practical checklist for structuring a review paper." }
    ], skills:["Systematic search strategies","Inclusion/exclusion criteria","Evidence synthesis vs. narration","Identifying research gaps","Building a conceptual framework"] },
    { name:"Presenting Research", timeframe:"Weeks 8–14", effort:"~2h/week", resources:[
      { title:"Ten Simple Rules for Oral Presentations - PLoS Comp Bio", type:"Free", free:true, url:"https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.0030077", note:"For journal clubs and lab meetings. Short, direct rules." },
      { title:"Better Posters Blog - Zen Faulkes", type:"Blog", free:true, url:"https://betterposters.blogspot.com/", note:"Conference poster design principles." },
      { title:"Fundamentals of Data Visualization - Claus Wilke", type:"Free Book", free:true, url:"https://clauswilke.com/dataviz/", note:"Free online. The standard reference for scientific figure design." }
    ], skills:["Journal club presentation structure","10-20 min lab talk format","Conference poster design","Handling Q&A under pressure","Visual data storytelling principles"] }
  ]}
];

const LEVELS = { FOUNDATION:{color:"#10B981",label:"Foundation"}, CRITICAL:{color:"#F43F5E",label:"Critical"}, STRATEGIC:{color:"#6366F1",label:"Strategic"}, CORE:{color:"#F59E0B",label:"Core"}, HIGH:{color:"#06B6D4",label:"High Priority"} };

const phases = [
  { range:"Weeks 1-4", title:"Build the Base", items:["Cell Biology fundamentals","Linear Algebra (3B1B)","Python scientific stack","Read 2 papers/week (start now)","Set up Zotero"] },
  { range:"Weeks 5-8", title:"Expand the Framework", items:["Genetics & Genomics","Probability & Statistics (StatQuest)","R + Bioconductor basics","ML Foundations","Scientific writing course begins"] },
  { range:"Weeks 9-12", title:"Go Deeper", items:["Single-cell transcriptomics","Deep Learning","SLURM & HPC basics","Paper structure & prose","Experiment design principles"] },
  { range:"Weeks 13-16", title:"Integrate & Apply", items:["AI for Biology (causal inference, GNNs)","Full scRNA-seq pipeline practice","Presentation skills (lab talk)","Draft or revise a preprint","Literature review synthesis"] }
];

const arUI = {
  "heroTag": "العلوم الحيوية · المعلوماتية الحيوية · الأحياء الحاسوبية",
  "heroTitle": "الأساس الكامل",
  "heroTitleAccent": "الذي يحتاجه كل طالب دراسات عليا",
  "heroDesc": "منهج ذاتي لمدة 16 أسبوعًا يغطي المجالات الستة الأساسية في أبحاث علوم الحياة الحديثة، مبني على موارد مجانية وعالية الجودة ومتاحة للجميع.",
  "stat1Label": "6 مجالات",
  "stat1Sub": "من الأحياء الجزيئية إلى AI",
  "stat2Label": "18 مسارًا",
  "stat2Sub": "تدرج منظم",
  "stat3Label": "54 موردًا",
  "stat3Sub": "معظمها مجاني",
  "stat4Label": "16 أسبوعًا",
  "stat4Sub": "10-25 ساعة / أسبوع",
  "byDomain": "حسب المجال",
  "weekPlan": "خطة 16 أسبوعًا",
  "planTitle": "خطة التدرج خلال 16 أسبوعًا",
  "planDesc": "تعمل المجالات الستة بالتوازي، لكن مع تغيّر التركيز. هذا هو التسلسل الموصى به؛ عدّله حسب مستواك الحالي.",
  "domainAlloc": "توزيع الوقت حسب المجال",
  "resources": "الموارد",
  "skills": "المهارات المطلوبة",
  "timeframe": "الإطار الزمني",
  "parallel": "يمكن تنفيذه بالتوازي مع المسارات الأخرى.",
  "free": "مجاني",
  "paid": "مدفوع",
  "open": "افتح ↗",
  "tracks": "مسارات",
  "resW": "موارد",
  "skillsW": "مهارات",
  "tracksF": "مسارات تتضمن موارد مجانية",
  "footerTitle": "خريطة أساسيات العلوم الحيوية",
  "footerSub": "مسموح بالمشاركة · 54 موردًا مختارًا · 6 مجالات · 16 أسبوعًا",
  "phases": [
    {
      "range": "الأسابيع 1-4",
      "title": "ابنِ الأساس",
      "items": [
        "أساسيات أحياء الخلية",
        "الجبر الخطي (3B1B)",
        "حزمة Python العلمية",
        "اقرأ ورقتين بحثيتين أسبوعيًا (ابدأ الآن)",
        "إعداد Zotero"
      ]
    },
    {
      "range": "الأسابيع 5-8",
      "title": "وسّع الإطار",
      "items": [
        "علم الوراثة والجينوميات",
        "الاحتمالات والإحصاء (StatQuest)",
        "أساسيات R + Bioconductor",
        "أساسيات ML",
        "بدء دورة الكتابة العلمية"
      ]
    },
    {
      "range": "الأسابيع 9-12",
      "title": "تعمّق أكثر",
      "items": [
        "ترانسكريبتوميات الخلية الواحدة",
        "التعلم العميق",
        "أساسيات SLURM و HPC",
        "بنية الورقة البحثية والصياغة العلمية",
        "مبادئ تصميم التجارب"
      ]
    },
    {
      "range": "الأسابيع 13-16",
      "title": "ادمج وطبّق",
      "items": [
        "AI للأحياء (الاستدلال السببي، GNNs)",
        "تدريب كامل على مسار تحليل scRNA-seq",
        "مهارات العرض (عرض مختبري)",
        "صياغة أو مراجعة preprint",
        "توليف مراجعة الأدبيات"
      ]
    }
  ]
};

const arDomains = [
  {
    "id": "mol",
    "emoji": "🧬",
    "color": "#10B981",
    "bg": "#10B98112",
    "border": "#10B98130",
    "title": "الأحياء الجزيئية والخلوية",
    "subtitle": "الأساس البيولوجي",
    "level": "تأسيسي",
    "description": "أتقن اللغة الأساسية للأحياء الحديثة. بدون هذا الأساس، يفقد كل شيء آخر معناه: التسلسل، الحوسبة، وAI. ابدأ من هنا.",
    "tracks": [
      {
        "name": "أساسيات بيولوجيا الخلية",
        "timeframe": "الأسابيع 1-3",
        "effort": "~3 ساعات/أسبوع",
        "resources": [
          {
            "title": "الأحياء الجزيئية للخلية - Alberts et al.",
            "type": "كتاب دراسي",
            "note": "مجاني عبر NCBI. مرجع قياسي. الفصول 1-8 كحد أدنى."
          },
          {
            "title": "MIT OCW 7.016 مقدمة في الأحياء",
            "type": "دورة",
            "note": "سلسلة محاضرات كاملة. شاهدها بسرعة 1.5x. دقيقة ولكن سهلة المتابعة."
          },
          {
            "title": "Crash Course Biology (YouTube)",
            "type": "فيديو",
            "note": "مراجعة سريعة للمفاهيم الأساسية. ممتازة لسد الفجوات."
          }
        ],
        "skills": [
          "دورة الخلية ونقاط التفتيش",
          "تضاعف DNA وإصلاحه",
          "النسخ والترجمة",
          "مسارات الإشارة الخلوية",
          "بيولوجيا الأغشية والعضيات"
        ]
      },
      {
        "name": "علم الوراثة والجينوميات",
        "timeframe": "الأسابيع 2-6",
        "effort": "~4 ساعات/أسبوع",
        "resources": [
          {
            "title": "مقدمة في الجينوميات - Coursera (Johns Hopkins)",
            "type": "دورة",
            "note": "يمكن حضورها مجانًا بنظام audit. تغطي التسلسل، استدعاء المتغيرات، والوراثة السكانية."
          },
          {
            "title": "Lewin's Genes XII",
            "type": "كتاب دراسي",
            "note": "ركز على فصول تنظيم الجينات وعلم التخلق."
          },
          {
            "title": "Khan Academy Genetics",
            "type": "مجاني",
            "note": "ممتازة لترسيخ أسس الوراثة وقواعد مندل."
          }
        ],
        "skills": [
          "الوراثة المندلية → الوراثة المعقدة",
          "علم التخلق وإعادة تشكيل الكروماتين",
          "مفاهيم SNP وindel وCNV",
          "شبكات تنظيم الجينات",
          "أساسيات GWAS والخطر متعدد الجينات"
        ]
      },
      {
        "name": "أحادي الخلية والترانسكربتوميات",
        "timeframe": "الأسابيع 6-12",
        "effort": "~4 ساعات/أسبوع",
        "resources": [
          {
            "title": "تنسيق تحليل الخلية المفردة (OSCA)",
            "type": "كتاب مجاني",
            "note": "المرجع الأهم في scRNA-seq. مبني على Bioconductor. احفظه ضمن مراجعك."
          },
          {
            "title": "دورة Hemberg Lab في scRNA-seq",
            "type": "دورة",
            "note": "يجمع بين النظرية والتطبيق. بنيته ممتازة."
          },
          {
            "title": "أفضل الممارسات الحالية في scRNA-seq (Luecken & Theis 2019)",
            "type": "ورقة علمية",
            "note": "قراءة أساسية تعرض مسار التحليل الكامل."
          }
        ],
        "skills": [
          "مفاهيم تحضير مكتبة 10x Chromium",
          "العنقدة وخفض الأبعاد",
          "تحليل الزمن الزائف والمسارات التطورية",
          "اختبار التعبير التفاضلي",
          "استراتيجيات توصيف أنواع الخلايا"
        ]
      }
    ]
  },
  {
    "id": "math",
    "emoji": "∑",
    "color": "#6366F1",
    "bg": "#6366F112",
    "border": "#6366F130",
    "title": "الرياضيات",
    "subtitle": "المحرك الخفي",
    "level": "حرج",
    "description": "تحدث أغلب أخطاء المعلوماتية الحيوية لأن الباحثين لا يفهمون الرياضيات داخل أدواتهم. الجبر الخطي، الاحتمالات، والإحصاء ليست اختيارية.",
    "tracks": [
      {
        "name": "الجبر الخطي",
        "timeframe": "الأسابيع 1-4",
        "effort": "~3 ساعات/أسبوع",
        "resources": [
          {
            "title": "3Blue1Brown - جوهر الجبر الخطي",
            "type": "فيديو",
            "note": "أفضل شرح بصري لبناء الحدس. شاهده قبل أي شيء آخر."
          },
          {
            "title": "MIT 18.06 الجبر الخطي - Gilbert Strang",
            "type": "دورة",
            "note": "معيار ذهبي. محاضرات كاملة وتمارين. مجاني عبر MIT OCW."
          },
          {
            "title": "الجبر الخطي التفاعلي (كتاب دراسي تفاعلي)",
            "type": "مجاني",
            "note": "رفيق تفاعلي وبصري، ممتاز خصوصًا لفهم المتجهات الذاتية."
          }
        ],
        "skills": [
          "عمليات المصفوفات والتحليلات",
          "SVD وPCA (ضروريان لبيانات omics)",
          "القيم الذاتية والمتجهات الذاتية",
          "فضاءات المتجهات والإسقاطات",
          "حلول المربعات الصغرى"
        ]
      },
      {
        "name": "الاحتمالات والإحصاء",
        "timeframe": "الأسابيع 3-8",
        "effort": "~4 ساعات/أسبوع",
        "resources": [
          {
            "title": "StatQuest مع Josh Starmer (YouTube)",
            "type": "فيديو",
            "note": "إحصاء موجه للمعلوماتية الحيوية بشرح واضح جدًا. أساسي."
          },
          {
            "title": "الاحتمالات لعلم البيانات - UC Berkeley Prob140",
            "type": "كتاب مجاني",
            "note": "أسس بايزية صارمة. كتاب مجاني على الإنترنت."
          },
          {
            "title": "مقدمة في التعلم الإحصائي (ISLR)",
            "type": "كتاب مجاني",
            "note": "مرجع كلاسيكي في ML والإحصاء. PDF مجاني. بإصدارات R وPython."
          }
        ],
        "skills": [
          "نظرية بايز والاستدلال اللاحق",
          "اختبار الفرضيات وقيم p",
          "تصحيح الاختبارات المتعددة (FDR، Bonferroni)",
          "نماذج الانحدار (خطي، لوجستي، Cox)",
          "التوزيعات ونظرية أخذ العينات"
        ]
      },
      {
        "name": "التفاضل والتكامل والتحسين",
        "timeframe": "الأسابيع 5-10",
        "effort": "~3 ساعات/أسبوع",
        "resources": [
          {
            "title": "3Blue1Brown - جوهر التفاضل والتكامل",
            "type": "فيديو",
            "note": "ابن الحدس قبل المعادلات. شاهد الحلقات الـ11 كلها."
          },
          {
            "title": "Khan Academy التفاضل والتكامل متعدد المتغيرات",
            "type": "مجاني",
            "note": "التدرجات والمشتقات الجزئية مهمة لفهم نظرية ML."
          },
          {
            "title": "التحسين المحدب - Boyd & Vandenberghe",
            "type": "كتاب مجاني",
            "note": "PDF مجاني. أساسي لفهم دوال الهدف في ML."
          }
        ],
        "skills": [
          "المشتقات والتدرجات",
          "قاعدة السلسلة (أساس الانتشار العكسي)",
          "المشتقات الجزئية ومصفوفات Jacobian",
          "التحسين بالانحدار التدرجي",
          "أساسيات التحسين المقيد"
        ]
      }
    ]
  },
  {
    "id": "ai",
    "emoji": "🤖",
    "color": "#F43F5E",
    "bg": "#F43F5E12",
    "border": "#F43F5E30",
    "title": "AI وMachine Learning",
    "subtitle": "المحرك التحليلي",
    "level": "استراتيجي",
    "description": "الأحياء الحديثة لم تعد منفصلة عن ML. تحتاج إلى فهم النماذج بما يكفي لاختيارها، نقدها، والبناء عليها، لا مجرد تشغيل المسارات الجاهزة.",
    "tracks": [
      {
        "name": "أساسيات Machine Learning",
        "timeframe": "الأسابيع 4-8",
        "effort": "~4 ساعات/أسبوع",
        "resources": [
          {
            "title": "fast.ai - التعلم العميق العملي للمبرمجين",
            "type": "دورة",
            "note": "نهج يبدأ من التطبيق والكود. الأفضل لمن يتعلمون بالممارسة."
          },
          {
            "title": "تخصص تعلم الآلة - Andrew Ng (Coursera)",
            "type": "دورة",
            "note": "يمكن حضورها مجانًا بنظام audit. أسس واسعة وشروحات ممتازة."
          },
          {
            "title": "مقدمة في التعلم الإحصائي (ISLR)",
            "type": "كتاب مجاني",
            "note": "يتداخل مع مسار الإحصاء، اقرأ فصول ML هنا."
          }
        ],
        "skills": [
          "التعلم الموجه مقابل غير الموجه",
          "التحقق المتقاطع والتنظيم",
          "أشجار القرار → طرق التجميع",
          "خفض الأبعاد (PCA، UMAP، t-SNE)",
          "مقاييس تقييم النماذج"
        ]
      },
      {
        "name": "التعلم العميق والشبكات العصبية",
        "timeframe": "الأسابيع 7-12",
        "effort": "~4 ساعات/أسبوع",
        "resources": [
          {
            "title": "تخصص التعلم العميق - Andrew Ng (Coursera)",
            "type": "دورة",
            "note": "يغطي CNNs وRNNs والمحولات. يمكن حضورها مجانًا بنظام audit."
          },
          {
            "title": "The Annotated Transformer (Harvard NLP)",
            "type": "شرح تطبيقي",
            "note": "تنفيذ المحول سطرًا بسطر. افهم آلية الانتباه بعمق."
          },
          {
            "title": "Dive into Deep Learning (d2l.ai)",
            "type": "كتاب مجاني",
            "note": "تفاعلي ويستخدم PyTorch طوال الوقت. ممتاز للتعلم العملي."
          }
        ],
        "skills": [
          "الشبكات أمامية التغذية والمتكررة",
          "الشبكات الالتفافية للتسلسلات",
          "آلية الانتباه وبنية المحولات",
          "نقل التعلم والضبط الدقيق",
          "التنظيم والتطبيع بالدُفعات"
        ]
      },
      {
        "name": "AI للأحياء",
        "timeframe": "الأسابيع 10-16",
        "effort": "~4 ساعات/أسبوع",
        "resources": [
          {
            "title": "الاستدلال السببي: The Mixtape - Cunningham",
            "type": "كتاب مجاني",
            "note": "استدلال سببي سهل الوصول. حرج لتفسير التجارب البيولوجية."
          },
          {
            "title": "ورقة scVI - Lopez et al. 2018 (Nature Methods)",
            "type": "ورقة علمية",
            "note": "المشفّرات التلقائية التباينية في scRNA-seq. مرجع تأسيسي في المجال."
          },
          {
            "title": "ورقة AlphaFold2 (Jumper et al. 2021)",
            "type": "ورقة علمية",
            "note": "اقرأه لفهم كيف أعاد DL تشكيل علم البنية البروتينية."
          }
        ],
        "skills": [
          "الرسوم البيانية السببية DAGs ومنطق التدخل",
          "الشبكات العصبية الرسومية في الأحياء",
          "المشفّرات التلقائية التباينية (scVI، scANVI)",
          "مفاهيم التنبؤ بالبنية البروتينية",
          "نمذجة الاضطراب (CellOracle، SCENIC)"
        ]
      }
    ]
  },
  {
    "id": "code",
    "emoji": "⌨️",
    "color": "#F59E0B",
    "bg": "#F59E0B12",
    "border": "#F59E0B30",
    "title": "الحوسبة العلمية",
    "subtitle": "أدواتك المخبرية",
    "level": "أساسي",
    "description": "الكود هو منصة المختبر في الأحياء الحاسوبية. Python وR مهمان بنفس الدرجة. قابلية إعادة الإنتاج ليست خيارًا؛ إنها نظافة مهنية.",
    "tracks": [
      {
        "name": "Python للبحث العلمي",
        "timeframe": "الأسابيع 1-4",
        "effort": "~3 ساعات/أسبوع",
        "resources": [
          {
            "title": "محاضرات Scientific Python",
            "type": "مجاني",
            "note": "NumPy وSciPy وmatplotlib: الحزمة العلمية. مرجع أساسي."
          },
          {
            "title": "الفصل المفقود من علوم الحاسب - MIT",
            "type": "دورة",
            "note": "Shell وGit والمحررات وتصحيح الأخطاء. يحتاجها كل باحث."
          },
          {
            "title": "شرح Snakemake",
            "type": "شرح تطبيقي",
            "note": "مسارات معلوماتية حيوية قابلة لإعادة الإنتاج. متوقعة في أي مختبر جاد."
          }
        ],
        "skills": [
          "الحوسبة المتجهة باستخدام NumPy",
          "Pandas للبيانات الجدولية",
          "دفاتر Jupyter قابلة لإعادة الإنتاج",
          "مسارات عمل Snakemake/Nextflow",
          "إدارة بيئات Conda"
        ]
      },
      {
        "name": "R للمعلوماتية الحيوية",
        "timeframe": "الأسابيع 3-8",
        "effort": "~4 ساعات/أسبوع",
        "resources": [
          {
            "title": "R for Data Science - Hadley Wickham",
            "type": "كتاب مجاني",
            "note": "تعلم tidyverse بشكل صحيح. غير قابل للتفاوض إذا كنت ستستخدم Bioconductor."
          },
          {
            "title": "سير عمل RNA-seq - Bioconductor (limma/DESeq2)",
            "type": "شرح تطبيقي",
            "note": "مسار تحليلي معياري في المختبرات لتحليل التعبير التفاضلي."
          },
          {
            "title": "تحليل البيانات لعلوم الحياة - Irizarry & Love",
            "type": "مجاني",
            "note": "سلسلة HarvardX مجانية. مبنية على R. يقدمها مدرسون عالميون."
          }
        ],
        "skills": [
          "ggplot2 ورسوم بجودة النشر",
          "DESeq2 وedgeR للتعبير التفاضلي",
          "Seurat لتحليل scRNA-seq",
          "منظومة حزم Bioconductor",
          "R Markdown لتقارير قابلة لإعادة الإنتاج"
        ]
      },
      {
        "name": "HPC وLinux",
        "timeframe": "الأسابيع 4-8",
        "effort": "~2 ساعات/أسبوع",
        "resources": [
          {
            "title": "Software Carpentry - Shell, Git & Python",
            "type": "شرح تطبيقي",
            "note": "عملي وموجه للأحياء. بأسلوب ورش العمل. مجاني على الإنترنت."
          },
          {
            "title": "مقدمة إلى SLURM (مجدول وظائف HPC)",
            "type": "شرح تطبيقي",
            "note": "معظم عناقيد الجامعات والمعاهد تستخدم SLURM. تعلمه قبل وصولك."
          },
          {
            "title": "Docker للمعلوماتية الحيوية - BioContainers",
            "type": "شرح تطبيقي",
            "note": "الحاويات تعني قابلية إعادة الإنتاج. مطلوبة للمسارات الجادة."
          }
        ],
        "skills": [
          "برمجة Bash والأتمتة",
          "إرسال مهام SLURM ومراقبتها",
          "التحكم بالإصدارات والتعاون عبر Git",
          "حاويات Docker/Singularity",
          "tmux والعمل على الخوادم عن بعد"
        ]
      }
    ]
  },
  {
    "id": "writing",
    "emoji": "✍️",
    "color": "#06B6D4",
    "bg": "#06B6D412",
    "border": "#06B6D430",
    "title": "الكتابة العلمية",
    "subtitle": "صوتك في المجال",
    "level": "مرتفع",
    "description": "معظم الباحثين يكتبون بشكل ضعيف لأنهم لم يتعلموا الكتابة العلمية. الورقة الواضحة والدقيقة مهارة يمكن تعلمها بنظام، وهي تؤثر بقوة على مسارك المهني.",
    "tracks": [
      {
        "name": "قراءة الأوراق بكفاءة",
        "timeframe": "من الأسبوع 1 فصاعدًا",
        "effort": "~2 ساعات/أسبوع",
        "resources": [
          {
            "title": "كيف تقرأ ورقة علمية - S. Keshav",
            "type": "PDF مجاني",
            "note": "دليل من صفحتين. طريقة القراءة بثلاث تمريرات. اقرأه اليوم قبل أي شيء آخر."
          },
          {
            "title": "Connected Papers",
            "type": "أداة",
            "note": "صوّر شبكات الاستشهاد حول الأوراق الأساسية في مجالك."
          },
          {
            "title": "Semantic Scholar",
            "type": "أداة",
            "note": "اضبط تنبيهات الاستشهاد للمؤلفين الرئيسيين. ابقَ محدثًا تلقائيًا."
          }
        ],
        "skills": [
          "طريقة القراءة بثلاث تمريرات",
          "تمييز المساهمة الحقيقية عن العمل التدريجي",
          "التقييم النقدي لأقسام المنهجية",
          "بناء مكتبة أدبيات مشروحة",
          "تلخيص الأوراق في 5 جمل"
        ]
      },
      {
        "name": "بنية الورقة والأسلوب العلمي",
        "timeframe": "الأسابيع 6-10",
        "effort": "~3 ساعات/أسبوع",
        "resources": [
          {
            "title": "الكتابة في العلوم - Coursera (Stanford)",
            "type": "دورة",
            "note": "دورة Kristin Sainani. مؤثرة جدًا. أفضل دورة كتابة للعلماء."
          },
          {
            "title": "حرفة الكتابة العلمية - Michael Alley",
            "type": "كتاب دراسي",
            "note": "مرجع موثوق. ركز على الوضوح والدقة."
          },
          {
            "title": "Nature: كيف تكتب ورقة علمية من الدرجة الأولى",
            "type": "مجاني",
            "note": "نصائح مباشرة من محرري Nature. قصيرة وتستحق القراءة."
          }
        ],
        "skills": [
          "بنية IMRAD",
          "كتابة ملخصات مركزة",
          "تعليقات أشكال مفهومة بذاتها",
          "إزالة المبني للمجهول الزائد",
          "وضوح نسبة الادعاءات إلى الأدلة"
        ]
      },
      {
        "name": "إدارة المراجع والتقديم",
        "timeframe": "الأسابيع 2-4 (إعداد) + مستمر",
        "effort": "~1 ساعة/أسبوع",
        "resources": [
          {
            "title": "Zotero Reference Manager",
            "type": "أداة",
            "note": "ابدأ قاعدة الأدبيات الآن. نظمها حسب الموضوع أو المشروع من اليوم الأول."
          },
          {
            "title": "EQUATOR Network - إرشادات إعداد التقارير",
            "type": "مورد",
            "note": "STROBE وCONSORT وMIQE: اعرف معيار الإبلاغ المناسب لنوع دراستك."
          },
          {
            "title": "bioRxiv Preprint Server",
            "type": "مورد",
            "note": "preprint أصبح شائعًا في الأحياء الآن. افهم سير العمل."
          }
        ],
        "skills": [
          "Zotero للاقتباس أثناء الكتابة",
          "أنماط الاقتباس CSL",
          "الالتزام بإرشادات الإبلاغ",
          "استراتيجية preprint مقابل المجلة",
          "الرد على مراجعة الأقران"
        ]
      }
    ]
  },
  {
    "id": "research",
    "emoji": "🔬",
    "color": "#EC4899",
    "bg": "#EC489912",
    "border": "#EC489930",
    "title": "الممارسة البحثية",
    "subtitle": "كيف يعمل العلم فعليًا",
    "level": "مرتفع",
    "description": "المعرفة بالمجال وحدها لا تصنع باحثًا. المهارات الفوقية، مثل تصميم التجارب، عرض النتائج، وطرح السؤال الصحيح، هي ما يفرق المساهمين عن المستهلكين.",
    "tracks": [
      {
        "name": "تصميم التجارب والفرضيات",
        "timeframe": "الأسابيع 4-7",
        "effort": "~2 ساعات/أسبوع",
        "resources": [
          {
            "title": "تصميم التجارب في الأحياء - HHMI BioInteractive",
            "type": "مجاني",
            "note": "بصري، صارم، وسهل الوصول. يغطي الضوابط، المتغيرات، وقابلية إعادة الإنتاج."
          },
          {
            "title": "Think Bayes - Allen Downey",
            "type": "كتاب مجاني",
            "note": "تفكير بايزي مطبق على الاستدلال التجريبي الحقيقي."
          },
          {
            "title": "كيف تصمم تجربة جيدة - Nature Methods",
            "type": "مجاني",
            "note": "إرشاد قصير وموثوق حول القوة الإحصائية وحجم العينة."
          }
        ],
        "skills": [
          "صياغة الفرضية (قابلة للدحض ومحددة)",
          "تصميم تجارب الضبط",
          "حجم العينة والقوة الإحصائية",
          "قابلية إعادة الإنتاج والتكرار",
          "تحديد المتغيرات المربكة"
        ]
      },
      {
        "name": "مراجعة الأدبيات والتركيب",
        "timeframe": "الأسابيع 2-8",
        "effort": "~2 ساعات/أسبوع",
        "resources": [
          {
            "title": "PubMed Advanced Search",
            "type": "أداة",
            "note": "أتقن عوامل Boolean ومصطلحات MeSH. البحث المنهجي مهارة."
          },
          {
            "title": "Rayyan - أداة المراجعة المنهجية",
            "type": "أداة",
            "note": "مجاني للباحثين. تعاون في فرز الملخصات."
          },
          {
            "title": "عشر قواعد بسيطة لكتابة مراجعة أدبية - PLoS",
            "type": "مجاني",
            "note": "قائمة عملية لتنظيم ورقة مراجعة."
          }
        ],
        "skills": [
          "استراتيجيات البحث المنهجي",
          "معايير الإدراج والاستبعاد",
          "تركيب الأدلة مقابل السرد",
          "تحديد فجوات البحث",
          "بناء إطار مفاهيمي"
        ]
      },
      {
        "name": "عرض البحث",
        "timeframe": "الأسابيع 8-14",
        "effort": "~2 ساعات/أسبوع",
        "resources": [
          {
            "title": "عشر قواعد بسيطة للعروض الشفهية - PLoS Comp Bio",
            "type": "مجاني",
            "note": "لنوادي المجلات واجتماعات المختبر. قواعد قصيرة ومباشرة."
          },
          {
            "title": "مدونة Better Posters - Zen Faulkes",
            "type": "مدونة",
            "note": "مبادئ تصميم الملصقات العلمية للمؤتمرات."
          },
          {
            "title": "أساسيات تصوير البيانات - Claus Wilke",
            "type": "كتاب مجاني",
            "note": "مجاني على الإنترنت. المرجع القياسي لتصميم الأشكال العلمية."
          }
        ],
        "skills": [
          "بنية عرض Journal club",
          "صيغة حديث مختبري مدته 10-20 دقيقة",
          "تصميم ملصق مؤتمر",
          "التعامل مع الأسئلة تحت الضغط",
          "مبادئ سرد البيانات بصريًا"
        ]
      }
    ]
  }
];

function BioscienceFoundation() {
  const [lang, setLangState] = useState('en');
  const [activeTab, setActiveTab] = useState("mol");
  const [expandedTrack, setExpandedTrack] = useState(null);
  const [view, setView] = useState("domains");

  useEffect(() => {
    const handler = (e) => { setLangState(e.detail.lang); setExpandedTrack(null); };
    window.addEventListener('langchange', handler);
    return () => window.removeEventListener('langchange', handler);
  }, []);

  const isAr = lang === 'ar';
  const activeDomain = (isAr ? arDomains : domains).find(d => d.id === activeTab);
  const displayDomains = isAr ? arDomains : domains;
  const displayPhases = isAr ? arUI.phases : phases;
  const t = isAr ? arUI : {
    heroTag:"BIOSCIENCE · BIOINFORMATICS · COMPUTATIONAL BIOLOGY",
    heroTitle:"The Complete Foundation",heroTitleAccent:"Every Graduate Student Needs",
    heroDesc:"A 16-week, self-directed curriculum covering the six core domains of modern life sciences research, built around free, high-quality resources available to everyone.",
    byDomain:"By Domain",weekPlan:"16-Week Plan",planTitle:"16-Week Progression Plan",
    planDesc:"All six domains run in parallel, but with shifting emphasis. This is the recommended sequencing; adjust based on your current level.",
    domainAlloc:"Domain Time Allocation",resources:"Resources",skills:"Skills to Acquire",
    timeframe:"Timeframe",parallel:"Can be done in parallel with other tracks.",
    free:"FREE",paid:"PAID",open:"Open ↗",tracks:"tracks",resW:"resources",
    skillsW:"skills",tracksF:"tracks w/ free",
    footerTitle:"Bioscience Foundation Roadmap",
    footerSub:"Free to share · 54 curated resources · 6 domains · 16 weeks",
    phases:phases
  };
  const displayPhases = isAr ? arUI.phases : phases;

  return (
    <div style={{minHeight:"100vh",background:"#F8F7F4",color:"#1A1A2E",fontFamily:isAr?"'Noto Kufi Arabic',sans-serif":"'IBM Plex Sans',system-ui,sans-serif",direction:isAr?"rtl":"ltr"}}>
      <div style={{background:"#1A1A2E",padding:"52px 40px 44px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
        <div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}>
          <div style={{display:"inline-block",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:6,padding:"5px 14px",fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:"inherit",letterSpacing:isAr?0:"0.1em",marginBottom:20}}>{t.heroTag}</div>
          <h1 style={{fontFamily:isAr?"'Noto Kufi Arabic',sans-serif":"'Playfair Display',Georgia,serif",fontSize:"clamp(28px,4.5vw,50px)",fontWeight:800,color:"white",lineHeight:1.2,marginBottom:16,maxWidth:680}}>{t.heroTitle}<br/><span style={{color:"#10B981"}}>{t.heroTitleAccent}</span></h1>
          <p style={{color:"rgba(255,255,255,0.55)",fontSize:15,maxWidth:580,lineHeight:1.7,marginBottom:32,fontWeight:300}}>{t.heroDesc}</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[{label:isAr?"6 محاور":"6 Domains",sub:isAr?"من الأحياء الجزيئية إلى الذكاء الاصطناعي":"Molecular Bio to AI"},{label:isAr?"18 مساراً":"18 Tracks",sub:isAr?"تقدم منظم":"Structured progression"},{label:isAr?"54 مصدراً":"54 Resources",sub:isAr?"معظمها مجاني":"Mostly free"},{label:isAr?"16 أسبوعاً":"16 Weeks",sub:isAr?"10-25 ساعة / أسبوع":"10-25h / week"}].map((s,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"14px 20px",minWidth:110}}>
                <div style={{fontFamily:isAr?"'Noto Kufi Arabic',sans-serif":"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"white"}}>{s.label}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"inherit",marginTop:2}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:"white",borderBottom:"1.5px solid #E8E5DF",padding:"16px 40px",position:"sticky",top:48,zIndex:49,boxShadow:"0 2px 12px rgba(0,0,0,0.04)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {displayDomains.map(d=>(
              <button key={d.id} className={"f-domain-tab"+(activeTab===d.id&&view==="domains"?" active":"")} style={{"--ftc":d.color,"--ftbg":d.bg}} onClick={()=>{setActiveTab(d.id);setView("domains");setExpandedTrack(null);}}>
                <span style={{fontSize:15}}>{d.emoji}</span><span>{d.title.split(" ").slice(0,2).join(" ")}</span>
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:6}}>
            <button className={"f-view-btn"+(view==="domains"?" active":"")} onClick={()=>setView("domains")}>{t.byDomain}</button>
            <button className={"f-view-btn"+(view==="timeline"?" active":"")} onClick={()=>setView("timeline")}>{t.weekPlan}</button>
          </div>
        </div>
      </div>

      {view==="timeline"&&(
        <div className="slide-up" style={{maxWidth:1100,margin:"0 auto",padding:"40px"}}>
          <h2 style={{fontFamily:isAr?"'Noto Kufi Arabic',sans-serif":"'Playfair Display',serif",fontSize:28,fontWeight:700,color:"#1A1A2E",marginBottom:8}}>{t.planTitle}</h2>
          <p style={{color:"#888",fontSize:13,lineHeight:1.6,marginBottom:32}}>{t.planDesc}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16,marginBottom:40}}>
            {displayPhases.map((phase,i)=>{
              const colors=["#10B981","#6366F1","#F43F5E","#F59E0B"];
              return(
                <div key={i} className="f-phase-card" style={{"--fpc":colors[i]}}>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:colors[i],marginBottom:6,fontWeight:500}}>{phase.range}</div>
                  <div style={{fontFamily:isAr?"'Noto Kufi Arabic',sans-serif":"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#1A1A2E",marginBottom:14}}>{phase.title}</div>
                  {phase.items.map((item,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:12,color:"#666",lineHeight:1.4,marginBottom:6}}>
                      <span style={{color:colors[i],marginTop:2,flexShrink:0}}>{isAr?"‹":"›"}</span>{item}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div style={{background:"white",border:"1.5px solid #E8E5DF",borderRadius:12,padding:"24px 28px"}}>
            <h3 style={{fontFamily:isAr?"'Noto Kufi Arabic',sans-serif":"'Playfair Display',serif",fontSize:18,fontWeight:700,marginBottom:16}}>{t.domainAlloc}</h3>
            {domains.map((d,idx)=>{
              const pct=[22,18,20,18,12,10][idx];
              return(
                <div key={d.id} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
                  <div style={{width:160,fontSize:12,color:"#444",fontFamily:"'IBM Plex Mono',monospace",flexShrink:0}}>{d.emoji} {d.title.split(" ").slice(0,3).join(" ")}</div>
                  <div style={{flex:1,height:8,background:"#F0EEE9",borderRadius:4,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:d.color,borderRadius:4}}/></div>
                  <div style={{width:36,fontSize:11,color:"#999",fontFamily:"'IBM Plex Mono',monospace",textAlign:"right"}}>{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view==="domains"&&activeDomain&&(
        <div key={activeTab} className="slide-up" style={{maxWidth:1100,margin:"0 auto",padding:"40px"}}>
          <div style={{background:"white",border:"1.5px solid #E8E5DF",borderRadius:14,padding:"28px 32px",marginBottom:24,borderLeft:isAr?"1.5px solid #E8E5DF":`5px solid ${activeDomain.color}`,borderRight:isAr?`5px solid ${activeDomain.color}`:"1.5px solid #E8E5DF"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
              <div style={{flex:1,minWidth:280}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <span style={{fontSize:28}}>{activeDomain.emoji}</span>
                  <div>
                    <span style={{background:LEVELS[activeDomain.level].color+"18",color:LEVELS[activeDomain.level].color,border:`1px solid ${LEVELS[activeDomain.level].color}35`,borderRadius:4,padding:"2px 9px",fontSize:10,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:"0.08em",fontWeight:500,display:"inline-block",marginBottom:4}}>{LEVELS[activeDomain.level].label}</span>
                    <h2 style={{fontFamily:isAr?"'Noto Kufi Arabic',sans-serif":"'Playfair Display',serif",fontSize:26,fontWeight:700,color:"#1A1A2E",lineHeight:1.1}}>{activeDomain.title}</h2>
                    <div style={{fontSize:13,color:activeDomain.color,fontWeight:500,marginTop:2}}>{activeDomain.subtitle}</div>
                  </div>
                </div>
                <p style={{color:"#666",fontSize:13,lineHeight:1.7,maxWidth:560}}>{activeDomain.description}</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[{val:activeDomain.tracks.length,label:t.tracks},{val:activeDomain.tracks.reduce((a,tr)=>a+tr.resources.length,0),label:t.resW},{val:activeDomain.tracks.reduce((a,tr)=>a+tr.skills.length,0),label:t.skillsW},{val:activeDomain.tracks.filter(tr=>tr.resources.some(r=>r.free)).length,label:t.tracksF}].map((s,i)=>(
                  <div key={i} style={{background:activeDomain.bg,border:`1px solid ${activeDomain.border}`,borderRadius:8,padding:"12px 16px",textAlign:"center",minWidth:80}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:activeDomain.color}}>{s.val}</div>
                    <div style={{fontSize:10,color:"#999",fontFamily:"'IBM Plex Mono',monospace"}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {activeDomain.tracks.map((track,i)=>{
              const isOpen=expandedTrack===i;
              return(
                <div key={i} className={"f-track-card"+(isOpen?" open":"")} style={{"--fdc":activeDomain.color}} onClick={()=>setExpandedTrack(isOpen?null:i)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <div style={{width:36,height:36,background:activeDomain.bg,border:`1.5px solid ${activeDomain.border}`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'IBM Plex Mono',monospace",fontSize:13,color:activeDomain.color,fontWeight:500,flexShrink:0}}>{String(i+1).padStart(2,"0")}</div>
                      <div>
                        <div style={{fontWeight:600,fontSize:15,color:"#1A1A2E",marginBottom:3}}>{track.name}</div>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <span style={{fontSize:11,color:"#999",fontFamily:"'IBM Plex Mono',monospace"}}>{track.timeframe}</span>
                          <span style={{width:3,height:3,background:"#D0CCC6",borderRadius:"50%",display:"inline-block"}}/>
                          <span style={{fontSize:11,color:"#999",fontFamily:"'IBM Plex Mono',monospace"}}>{track.effort}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:11,color:"#AAA",fontFamily:"'IBM Plex Mono',monospace"}}>{track.resources.length} resources · {track.skills.length} skills</span>
                      <div style={{width:26,height:26,background:isOpen?activeDomain.color:"#F0EEE9",border:`1.5px solid ${isOpen?activeDomain.color:"#E8E5DF"}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:isOpen?"white":"#999",fontSize:14,transition:"all 0.2s"}}>{isOpen?"−":"+"}</div>
                    </div>
                  </div>
                  {isOpen&&(
                    <div onClick={e=>e.stopPropagation()} style={{marginTop:24,paddingTop:24,borderTop:"1px solid #EEE"}}>
                      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:24}}>
                        <div>
                          <div style={{fontSize:11,color:"#AAA",textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"'IBM Plex Mono',monospace",marginBottom:12,fontWeight:500}}>{t.resources}</div>
                          <div style={{display:"flex",flexDirection:"column",gap:10}}>
                            {track.resources.map((r,j)=>(
                              <div key={j} className="f-res-card">
                                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                                  <span style={{fontSize:13,color:"#1A1A2E",fontWeight:500,lineHeight:1.4,flex:1}}>{r.title}</span>
                                  <div style={{display:"flex",gap:5,flexShrink:0}}>
                                    <span className="f-badge" style={{background:r.free?"#10B98118":"#FFF4E5",color:r.free?"#10B981":"#F59E0B",border:`1px solid ${r.free?"#10B98130":"#F59E0B30"}`}}>{r.free?t.free:t.paid}</span>
                                    <span className="f-badge" style={{background:"#F0EEE9",color:"#888",border:"1px solid #E8E5DF"}}>{r.type}</span>
                                  </div>
                                </div>
                                <p style={{fontSize:12,color:"#888",lineHeight:1.5,margin:"6px 0 0"}}>{r.note}</p>
                                <a href={r.url} target="_blank" rel="noopener noreferrer" className="f-link-btn">{t.open}</a>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{fontSize:11,color:"#AAA",textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"'IBM Plex Mono',monospace",marginBottom:12,fontWeight:500}}>{t.skills}</div>
                          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                            {track.skills.map((s,j)=>(
                              <span key={j} className="f-skill-tag"><span style={{color:activeDomain.color,marginRight:5,fontSize:9}}>●</span>{s}</span>
                            ))}
                          </div>
                          <div style={{marginTop:20,background:activeDomain.bg,border:`1px solid ${activeDomain.border}`,borderRadius:8,padding:"14px 16px"}}>
                            <div style={{fontSize:11,color:activeDomain.color,fontFamily:"'IBM Plex Mono',monospace",fontWeight:500,marginBottom:5}}>{t.timeframe}</div>
                            <div style={{fontSize:12,color:"#666",lineHeight:1.6}}><strong style={{color:"#333"}}>{track.timeframe}</strong> at <strong style={{color:"#333"}}>{track.effort}</strong>.<br/>{t.parallel}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{background:"#1A1A2E",padding:"32px 40px",marginTop:20}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{fontFamily:isAr?"'Noto Kufi Arabic',sans-serif":"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"white",marginBottom:4}}>{t.footerTitle}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",fontFamily:"'IBM Plex Mono',monospace"}}>{t.footerSub}</div>
          </div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {domains.map(d=>(
              <div key={d.id} style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:d.color}}/>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"'IBM Plex Mono',monospace"}}>{d.title.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

try {
  ReactDOM.createRoot(document.getElementById('foundation-root')).render(<BioscienceFoundation/>);
} catch(e) {
  document.getElementById('foundation-root').innerHTML = '<div style="color:red;padding:40px;font-family:monospace;background:white;">Foundation Error: ' + e.message + '</div>';
}