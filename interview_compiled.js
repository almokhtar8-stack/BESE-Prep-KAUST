const {
  useState: useStateI,
  useEffect: useEffectI
} = React;
const ACCENT_I = "#3d6b8a";
const scienceTopics = [{
  name: "A. Cell Structure & Organelles",
  foundation: [{
    label: "Cell",
    def: "The fundamental structural and functional unit of all living organisms. Bounded by a plasma membrane. Contains genetic material (DNA)."
  }, {
    label: "Prokaryotic cell",
    def: "No membrane-bound nucleus. DNA in nucleoid region. Smaller ribosomes (70S). Examples: bacteria, archaea. No organelles like mitochondria or ER."
  }, {
    label: "Eukaryotic cell",
    def: "Membrane-bound nucleus. Larger ribosomes (80S). Membrane-bound organelles (mitochondria, ER, Golgi, lysosomes). Linear chromosomes with histones."
  }, {
    label: "Plasma membrane",
    def: "Phospholipid bilayer with embedded proteins. Fluid mosaic model: membrane is fluid, proteins move laterally. Contains cholesterol (stabilizes fluidity), integral proteins (span membrane), peripheral proteins (attached to surface)."
  }, {
    label: "Nucleus",
    def: "Double membrane (nuclear envelope) with nuclear pores. Contains chromatin (DNA + histones). Nucleolus inside: site of ribosomal RNA (rRNA) synthesis. Controls gene expression and cell division."
  }, {
    label: "Mitochondria",
    def: "Double membrane. Inner membrane folded into cristae (increases surface area for ATP production). Contains its own circular DNA (maternal inheritance). Site of oxidative phosphorylation and citric acid cycle."
  }, {
    label: "Rough ER",
    def: "Studded with ribosomes. Synthesizes proteins destined for secretion, membrane insertion, or lysosomes."
  }, {
    label: "Smooth ER",
    def: "No ribosomes. Synthesizes lipids, detoxifies drugs, stores calcium."
  }, {
    label: "Golgi apparatus",
    def: "Stack of flattened cisternae. Receives proteins from ER, modifies them (glycosylation, phosphorylation), sorts and packages them into vesicles for secretion or delivery to other organelles."
  }, {
    label: "Lysosomes",
    def: "Membrane-bound vesicles with hydrolytic enzymes. Function at pH ~5. Digest macromolecules, damaged organelles (autophagy), foreign material (phagocytosis). Defects cause lysosomal storage diseases (e.g., Tay-Sachs)."
  }, {
    label: "Peroxisomes",
    def: "Contain oxidative enzymes (catalase, oxidases). Break down fatty acids via beta-oxidation. Detoxify H2O2. Use oxidative reactions (not hydrolysis), neutral pH. Distinct from lysosomes."
  }, {
    label: "Cytoskeleton",
    def: "Microfilaments (actin, 7nm, cell shape/movement), Intermediate filaments (keratin, 10nm, mechanical strength), Microtubules (tubulin, 25nm, intracellular transport, division spindle)."
  }],
  traps: ["Prokaryotes = 70S ribosomes. Eukaryotes = 80S. Mitochondria also have 70S (endosymbiosis evidence).", "Smooth ER does NOT synthesize proteins. That is Rough ER.", "Lysosomes use hydrolysis at acidic pH. Peroxisomes use oxidation at neutral pH. Don't confuse them.", "Nuclear pores are selective; use nuclear localization signals (NLS) and importins/exportins. Not open holes."],
  qas: [{
    q: "Describe the structure and function of the cell membrane.",
    a: "The cell membrane is a phospholipid bilayer with embedded proteins, described by the fluid mosaic model. Phospholipids have hydrophilic heads (face water) and hydrophobic tails (face interior). Integral (transmembrane) proteins span the bilayer and function as channels, transporters, and receptors. Peripheral proteins attach to the surface and participate in signaling and structure. Cholesterol modulates membrane fluidity. The membrane is selectively permeable, controlling what enters and exits the cell via passive diffusion, facilitated diffusion, active transport, and vesicle trafficking."
  }]
}, {
  name: "B. DNA Structure, Genes & Chromosomes",
  foundation: [{
    label: "DNA structure",
    def: "Double-stranded helix. Sugar-phosphate backbone. Bases: A-T (2 H-bonds), G-C (3 H-bonds). Anti-parallel strands (5'→3' and 3'→5'). Stores genetic information."
  }, {
    label: "Gene",
    def: "A segment of DNA encoding a functional product (protein or functional RNA). Includes regulatory regions (promoter, enhancers), exons (coding), and introns (non-coding)."
  }, {
    label: "Chromosome",
    def: "A single, long DNA molecule packaged with histone proteins into chromatin. Humans: 46 chromosomes (22 autosomal pairs + XX or XY). Euchromatin = loosely packed, transcriptionally active. Heterochromatin = tightly packed, transcriptionally silent."
  }, {
    label: "Nucleosome",
    def: "Basic unit of chromatin. ~147 bp of DNA wrapped around an octamer of histones (2 each of H2A, H2B, H3, H4). Linker histone H1 stabilizes higher-order structure."
  }, {
    label: "Telomeres",
    def: "Repetitive sequences (TTAGGG) at chromosome ends. Protect against degradation and fusion. Shorten with each cell division (Hayflick limit). Telomerase extends them in stem cells and cancer cells."
  }, {
    label: "DNA Replication",
    def: "Semi-conservative: each new molecule has one parental and one new strand (Meselson-Stahl experiment). Eukaryotes have multiple origins of replication."
  }, {
    label: "Key replication enzymes",
    def: "Helicase (unwinds helix), Topoisomerase (relieves torsional strain), Primase (RNA primer), DNA Pol III (synthesis 5'→3'), DNA Pol I (removes primers), Ligase (joins Okazaki fragments)."
  }, {
    label: "Leading vs. lagging strand",
    def: "Leading: synthesized continuously toward replication fork. Lagging: synthesized as discontinuous Okazaki fragments away from fork, later joined by ligase."
  }],
  traps: ["DNA polymerase can ONLY synthesize 5'→3'. It CANNOT go 3'→5'.", "RNA primers are required because DNA polymerase cannot initiate synthesis de novo.", "Telomere shortening explains the Hayflick limit (finite cell divisions in normal cells).", "DNA polymerase has 3'→5' exonuclease proofreading activity. Error rate after proofreading: ~1 in 10^9 bases."],
  qas: [{
    q: "Describe the process of DNA replication and name key enzymes.",
    a: "DNA replication is semi-conservative. Helicase unwinds the double helix at the origin of replication. Single-strand binding proteins stabilize the separated strands. Topoisomerase relieves torsional strain ahead of the fork. Primase lays down short RNA primers. DNA polymerase III synthesizes new DNA 5'→3'. The leading strand is synthesized continuously; the lagging strand is synthesized as Okazaki fragments. DNA polymerase I removes RNA primers and fills gaps; DNA ligase seals the nicks. Proofreading by the 3'→5' exonuclease activity of DNA polymerase ensures high fidelity (~1 error per 10^9 bases)."
  }]
}, {
  name: "C. Transcription (DNA → mRNA)",
  foundation: [{
    label: "Transcription",
    def: "Synthesis of an RNA molecule from a DNA template. RNA polymerase reads template DNA 3'→5' and synthesizes RNA 5'→3'."
  }, {
    label: "Eukaryotic RNA Polymerases",
    def: "RNA Pol I → rRNA. RNA Pol II → mRNA (protein-coding). RNA Pol III → tRNA, 5S rRNA. Prokaryotes: single RNA polymerase."
  }, {
    label: "5' cap",
    def: "7-methylguanosine added to 5' end of pre-mRNA. Protects from degradation, aids ribosome recognition, facilitates nuclear export. Eukaryotes only."
  }, {
    label: "3' poly-A tail",
    def: "~200 adenine nucleotides added to 3' end. Protects from exonuclease degradation, aids export and translation efficiency. Eukaryotes only."
  }, {
    label: "Splicing",
    def: "Removal of introns and joining of exons by the spliceosome. Alternative splicing: different exon combinations produce different protein isoforms from one gene."
  }],
  traps: ["Prokaryotes do NOT have 5' cap, poly-A tail, or splicing.", "Template strand is 3'→5'; the mRNA produced is 5'→3'.", "Alternative splicing is a major source of protein diversity; one gene can produce many proteins.", "RNA Pol II makes mRNA. RNA Pol I makes rRNA. RNA Pol III makes tRNA."],
  qas: [{
    q: "What are the key differences between prokaryotic and eukaryotic gene expression?",
    a: "Prokaryotic: transcription and translation are coupled. mRNA has no 5' cap, poly-A tail, or introns. Genes organized into operons. Single RNA polymerase. Eukaryotic: transcription occurs in nucleus, translation in cytoplasm. mRNA requires processing (5' cap, poly-A tail, splicing). Three RNA polymerases (I, II, III). Regulation at multiple levels: chromatin, transcription, post-transcription, translation, and post-translation."
  }, {
    q: "What is alternative splicing and why is it important?",
    a: "Alternative splicing is the process by which a single pre-mRNA can be processed to include or exclude different combinations of exons, producing multiple distinct mRNA variants and different protein isoforms from one gene. ~20,000 human genes can produce an estimated 100,000+ distinct proteins. Dysregulation is implicated in many diseases including cancer and neurological disorders."
  }]
}, {
  name: "D. Translation (mRNA → Protein)",
  foundation: [{
    label: "Translation",
    def: "Synthesis of a polypeptide chain from an mRNA template. Occurs on ribosomes in the cytoplasm."
  }, {
    label: "Codon",
    def: "Three mRNA nucleotides specifying one amino acid (or a stop signal). The genetic code is degenerate, universal, and non-overlapping."
  }, {
    label: "Start codon",
    def: "AUG (methionine). Signals beginning of translation."
  }, {
    label: "Stop codons",
    def: "UAA, UAG, UGA. Recognized by release factors (not tRNA)."
  }, {
    label: "Ribosome sites",
    def: "A site (aminoacyl): incoming charged tRNA binds. P site (peptidyl): holds tRNA attached to growing polypeptide. E site (exit): empty tRNA exits."
  }, {
    label: "Elongation",
    def: "Charged tRNA enters A site. Peptide bond forms (catalyzed by peptidyl transferase ribozyme in large subunit). Ribosome translocates one codon. Requires elongation factors and GTP."
  }, {
    label: "Post-translational modifications",
    def: "Folding (chaperones: Hsp70, Hsp60), cleavage (signal peptides), glycosylation (ER and Golgi), phosphorylation (kinases), ubiquitination (marks for proteasome degradation)."
  }],
  traps: ["Peptidyl transferase is a RIBOZYME (RNA-based enzyme), not a protein enzyme.", "Genetic code is degenerate but NOT ambiguous: each codon specifies only ONE amino acid.", "Stop codons are recognized by release FACTORS, not tRNA molecules."],
  qas: [{
    q: "What is the central dogma of molecular biology?",
    a: "The central dogma states that genetic information flows from DNA to RNA to protein. DNA is replicated (DNA→DNA), transcribed into mRNA (DNA→RNA), and translated into protein (RNA→protein). Exceptions exist: reverse transcriptase converts RNA to DNA (retroviruses like HIV), and RNA replication occurs in RNA viruses."
  }]
}, {
  name: "E. Gene Regulation & Epigenetics",
  foundation: [{
    label: "Histone acetylation",
    def: "Added by HATs. Loosens chromatin, increases transcription. Deacetylation by HDACs condenses chromatin, decreases transcription."
  }, {
    label: "DNA methylation",
    def: "Addition of methyl groups to cytosine (CpG dinucleotides). Generally silences gene expression. Heritable through cell divisions. Aberrant methylation silences tumor suppressor promoters in cancer."
  }, {
    label: "MicroRNA (miRNA)",
    def: "Small non-coding RNA (~22 nt). Binds 3' UTR of target mRNA → mRNA degradation or translational repression. Post-transcriptional regulation."
  }, {
    label: "siRNA (RNAi)",
    def: "Double-stranded RNA processed by Dicer into ~21 nt fragments. Loaded into RISC complex. Guides cleavage of complementary mRNA. Used experimentally for gene knockdown."
  }, {
    label: "Epigenetics",
    def: "Heritable changes in gene expression that do NOT alter DNA sequence. Mechanisms: DNA methylation, histone modification, non-coding RNAs."
  }, {
    label: "X-inactivation",
    def: "In females, one X chromosome is randomly inactivated per cell (forms Barr body). Mediated by XIST non-coding RNA."
  }],
  traps: ["Lac operon requires BOTH lactose present AND glucose absent for maximum expression.", "Epigenetic changes are heritable but reversible (unlike DNA mutations).", "DNA methylation generally silences genes; histone acetylation activates them.", "miRNA binds the 3' UTR of target mRNA; it does not alter DNA."],
  qas: [{
    q: "What is epigenetics? Give examples.",
    a: "Epigenetics refers to heritable changes in gene expression that do not alter the underlying DNA sequence. The three main mechanisms are: (1) DNA methylation, typically at CpG islands, which generally silences gene expression; (2) histone modification, including acetylation (activating) and methylation (can be activating or silencing); (3) non-coding RNAs such as microRNAs. Examples: X-inactivation in females, genomic imprinting, and cellular differentiation."
  }]
}, {
  name: "F. Cell Cycle, Mitosis & Meiosis",
  foundation: [{
    label: "G1 phase",
    def: "Cell growth, organelle duplication, preparation for DNA synthesis. G1/S checkpoint: checks DNA damage, cell size, growth signals."
  }, {
    label: "S phase",
    def: "DNA replication occurs. Each chromosome is duplicated (sister chromatids joined at centromere)."
  }, {
    label: "Mitosis result",
    def: "2 genetically identical diploid daughter cells. Used for growth and repair."
  }, {
    label: "Meiosis I (reductional)",
    def: "Homologous chromosomes pair (synapsis). Crossing over between non-sister chromatids (genetic diversity). Homologous pairs separate. Result: 2 haploid cells."
  }, {
    label: "Meiosis II (equational)",
    def: "Similar to mitosis. Sister chromatids separate. Result: 4 genetically unique haploid cells."
  }],
  traps: ["Mitosis → 2 DIPLOID identical cells. Meiosis → 4 HAPLOID unique cells.", "Crossing over occurs in Meiosis I ONLY, between non-sister chromatids of homologous chromosomes.", "Spindle checkpoint is at METAPHASE. Checks kinetochore attachment.", "Non-disjunction (failure to separate) → aneuploidy: trisomy or monosomy."],
  qas: [{
    q: "What is the difference between mitosis and meiosis?",
    a: "Mitosis produces 2 genetically identical diploid daughter cells, used for growth and repair. Meiosis produces 4 genetically unique haploid gametes, used for sexual reproduction. Key differences: meiosis has two rounds of division; crossing over and independent assortment occur in meiosis I, generating genetic diversity; homologous chromosomes pair and separate in meiosis I (reductional division), whereas sister chromatids separate in meiosis II and in mitosis."
  }]
}, {
  name: "G. Molecular Biology Techniques",
  foundation: [{
    label: "PCR",
    def: "Amplifies specific DNA segments in vitro. Steps per cycle: (1) Denaturation ~95°C, (2) Annealing ~55-65°C, (3) Extension ~72°C. Exponential amplification: 2^n copies after n cycles."
  }, {
    label: "CRISPR-Cas9",
    def: "Guide RNA (gRNA) directs Cas9 nuclease to a specific DNA sequence adjacent to a PAM (NGG for SpCas9). Cas9 creates a double-strand break. Repair: NHEJ (indels) or HDR (precise editing with template)."
  }, {
    label: "RNA-seq",
    def: "Sequences all RNA in a sample. Workflow: RNA extraction → reverse transcription to cDNA → fragmentation → sequencing → alignment → quantification. Detects alternative splicing, novel transcripts, differential expression."
  }, {
    label: "Blots",
    def: "Southern = DNA detection. Northern = RNA detection. Western = protein detection."
  }, {
    label: "BLAST",
    def: "Basic Local Alignment Search Tool. Compares query sequence against database. Output includes E-values (lower = more significant)."
  }],
  traps: ["PCR requires PRIMERS (short DNA). Taq polymerase has NO proofreading (lower fidelity).", "CRISPR uses a GUIDE RNA (not DNA) to direct Cas9 to the target.", "RNA-seq measures mRNA abundance, NOT protein levels.", "BLAST performs LOCAL alignment, not global."],
  qas: [{
    q: "What is CRISPR-Cas9 and how does it work?",
    a: "CRISPR-Cas9 is a genome editing technology derived from a bacterial adaptive immune system. It consists of a guide RNA (gRNA) complementary to the target DNA sequence, and the Cas9 endonuclease that creates a double-strand break at the target site adjacent to a PAM sequence (NGG for SpCas9). After the cut, the cell repairs the break by either NHEJ (introduces insertions or deletions that disrupt the gene) or HDR (uses a supplied template to make precise edits). Applications include gene knockout, gene correction, disease modeling, and therapeutic applications."
  }, {
    q: "What is the difference between RNA-seq and microarrays?",
    a: "Microarrays use hybridization to pre-designed probes for known sequences; limited dynamic range, cannot detect novel transcripts. RNA-seq uses next-generation sequencing to directly sequence all RNA molecules; can detect novel transcripts, alternative splicing events, and has a wider dynamic range. RNA-seq has largely replaced microarrays for most transcriptomic studies."
  }]
}, {
  name: "H. Cell Signaling",
  foundation: [{
    label: "Signal transduction",
    def: "The process by which an extracellular signal is converted into an intracellular response."
  }, {
    label: "Receptor tyrosine kinases (RTKs)",
    def: "Ligand binding causes dimerization and autophosphorylation of tyrosine residues. Activates Ras-MAPK (cell proliferation) and PI3K-Akt (cell survival). Mutations common in cancer (EGFR, HER2)."
  }, {
    label: "GPCRs",
    def: "Largest receptor family. Seven transmembrane domains. Ligand binding activates G-protein (GDP → GTP exchange). G-protein activates effectors: adenylyl cyclase (→ cAMP) or phospholipase C (→ IP3 and DAG)."
  }, {
    label: "Apoptosis (intrinsic)",
    def: "Mitochondrial pathway. DNA damage → cytochrome c release → apoptosome → caspase-9 activation → caspase-3 (executioner)."
  }, {
    label: "Apoptosis (extrinsic)",
    def: "Death receptor pathway. FasL binds Fas receptor → DISC formation → caspase-8 activation → caspase-3. Both pathways converge on caspase-3."
  }, {
    label: "Necrosis vs. apoptosis",
    def: "Necrosis: uncontrolled, cell swelling, membrane rupture → inflammation. Apoptosis: programmed, orderly, cell shrinkage, membrane blebbing, apoptotic bodies phagocytosed → NO inflammation."
  }],
  traps: ["Apoptosis does NOT cause inflammation (unlike necrosis).", "Ras is a GTPase. Oncogenic mutations keep it permanently GTP-bound → constitutive proliferative signaling.", "Cancer often involves gain-of-function in oncogenes AND loss-of-function in tumor suppressors simultaneously."],
  qas: [{
    q: "What is apoptosis and how does it differ from necrosis?",
    a: "Apoptosis is programmed cell death: orderly, energy-dependent, and does not cause inflammation. Features: cell shrinkage, chromatin condensation, membrane blebbing, formation of apoptotic bodies that are phagocytosed. Two pathways: intrinsic (mitochondrial: cytochrome c release, caspase-9) and extrinsic (death receptor: Fas/FasL, caspase-8). Both converge on caspase-3. Necrosis is uncontrolled cell death caused by injury or infection: cell swelling, membrane rupture, release of cellular contents causing inflammation."
  }]
}, {
  name: "I. Cancer Biology",
  foundation: [{
    label: "Oncogene",
    def: "Mutated form of a proto-oncogene. Gain-of-function mutation. Promotes cell proliferation even without appropriate signals. Examples: Ras, Myc, HER2/Neu."
  }, {
    label: "Tumor suppressor gene",
    def: "Normally inhibits cell proliferation or promotes apoptosis. Loss-of-function mutation contributes to cancer. Examples: p53 (apoptosis/arrest), Rb (G1/S checkpoint), BRCA1/BRCA2 (DNA repair)."
  }, {
    label: "p53",
    def: "Guardian of the genome. Activated by DNA damage: triggers (1) cell cycle arrest at G1/S via p21, (2) DNA repair genes, (3) apoptosis if damage irreparable. Mutated in >50% of human cancers."
  }, {
    label: "Two-hit hypothesis (Knudson)",
    def: "Both alleles of a tumor suppressor gene must be inactivated for loss of function."
  }, {
    label: "Hallmarks of cancer",
    def: "Sustaining proliferative signaling, evading growth suppressors, resisting cell death, enabling replicative immortality, inducing angiogenesis, activating invasion/metastasis."
  }],
  traps: ["Oncogene = gain-of-function. Tumor suppressor = loss-of-function.", "p53 is a transcription factor; it activates downstream target genes. It doesn't directly repair DNA.", "Two-hit: BOTH alleles must be inactivated for tumor suppressor loss of function."],
  qas: [{
    q: "Explain the role of p53 in cancer biology.",
    a: "p53 is a tumor suppressor protein called the guardian of the genome. When DNA damage is detected, p53 activates: (1) cell cycle arrest at G1/S via p21 (a CDK inhibitor); (2) DNA repair genes; (3) apoptosis if damage is irreparable. Loss-of-function mutations in p53 (found in >50% of human cancers) remove these protective mechanisms. p53 is a transcription factor; it directly activates the expression of downstream target genes."
  }]
}, {
  name: "J. Genomics & Bioinformatics",
  foundation: [{
    label: "Human genome facts",
    def: "~3.2 billion base pairs. ~20,000-25,000 protein-coding genes. Only ~1.5% of genome is protein-coding."
  }, {
    label: "Differential expression analysis",
    def: "Compares gene expression between conditions. RNA-seq workflow: align reads → quantify counts → normalize → statistical testing (DESeq2 uses negative binomial model) → multiple testing correction. Visualized with volcano plots or heatmaps."
  }, {
    label: "AlphaFold",
    def: "AI system by DeepMind that predicts protein 3D structure from amino acid sequence with near-experimental accuracy."
  }, {
    label: "scRNA-seq",
    def: "Single-cell RNA sequencing profiles the transcriptome of individual cells. Reveals cell subtypes, rare populations, differentiation trajectories, tumor heterogeneity. Analytics: PCA, UMAP, clustering, pseudotime, RNA velocity. Central to the Human Cell Atlas."
  }],
  traps: ["Only ~1.5% of the human genome codes for proteins. The rest is NOT junk; it includes regulatory elements and non-coding RNAs.", "Transcriptome is DYNAMIC (changes with conditions). Genome is STATIC.", "BLAST performs LOCAL alignment, not global. E-value: lower = more statistically significant.", "mRNA levels do NOT always predict protein levels."],
  qas: [{
    q: "What is the significance of single-cell RNA sequencing (scRNA-seq)?",
    a: "Bulk RNA-seq measures the average expression profile across millions of cells, masking cell-to-cell heterogeneity. scRNA-seq profiles the transcriptome of individual cells, revealing: (1) distinct cell types and subtypes within a tissue, (2) rare cell populations, (3) cellular state transitions and differentiation trajectories, (4) heterogeneity in tumor cell populations. Analytical methods include dimensionality reduction (PCA, UMAP), clustering, trajectory analysis (pseudotime), and RNA velocity. This technology is central to the Human Cell Atlas project."
  }, {
    q: "Explain differential gene expression analysis.",
    a: "Differential expression analysis compares gene expression levels between two or more conditions to identify genes that are significantly up- or down-regulated. In RNA-seq: (1) align sequencing reads to a reference genome, (2) quantify read counts per gene, (3) normalize for sequencing depth and gene length, (4) apply statistical tests (DESeq2 uses negative binomial model), (5) correct for multiple hypothesis testing (FDR). Output visualized with volcano plots or heatmaps."
  }]
}, {
  name: "K. Stem Cells & Differentiation",
  foundation: [{
    label: "Potency hierarchy",
    def: "Totipotent: all cell types + extraembryonic tissue (e.g., zygote). Pluripotent: all body cell types but not placenta (e.g., ESCs). Multipotent: several related cell types. Unipotent: single cell type."
  }, {
    label: "iPSCs",
    def: "Induced pluripotent stem cells. Adult somatic cells reprogrammed to pluripotent state by introducing Yamanaka factors: Oct4, Sox2, Klf4, c-Myc. Discovered by Shinya Yamanaka (Nobel Prize 2012). Avoids ethical issues of ESCs."
  }],
  traps: ["Totipotent can form placenta too; pluripotent cannot. This is the key distinction.", "iPSCs avoid the ethical concerns of ESC derivation (no embryo destruction required).", "Differentiation changes gene expression patterns, NOT the DNA sequence itself."],
  qas: [{
    q: "What are stem cells? Explain the differences between embryonic stem cells and iPSCs.",
    a: "Stem cells are undifferentiated cells capable of self-renewal and differentiation into specialized cell types. Embryonic stem cells (ESCs) are derived from the inner cell mass of the blastocyst; they are pluripotent. iPSCs are adult somatic cells reprogrammed to a pluripotent state by introducing four transcription factors (Oct4, Sox2, Klf4, c-Myc), discovered by Yamanaka (2006, Nobel 2012). Advantages of iPSCs: avoid ethical concerns of embryo destruction, can be patient-specific (reducing immune rejection risk), and enable disease modeling using patient-derived cells."
  }]
}];
const parts = [{
  id: "background",
  label: "Part 1",
  title: "General Background",
  duration: "~5 min",
  icon: "👤",
  color: "#4f7942",
  questions: [{
    q: "Tell me about yourself.",
    a: "Open with your degree, GPA, and any clinical or research experience. Then connect how that background drove your interest in bioscience. Mention hands-on training (bioinformatics, lab rotations, independent projects) and close with one sentence on what you're aiming to formalize through the M.S."
  }, {
    q: "Why this program / why this university?",
    a: "Cite the specific interdisciplinary environment: integration of wet-lab biology with computational methods, access to relevant faculty, and emphasis on translational or systems-level research. Avoid generic answers; name one specific lab, center, or recent initiative."
  }, {
    q: "What is your biggest weakness or gap?",
    a: "Be honest and specific (e.g., limited wet-lab experience, limited statistics background). Then explain what you've done to address it, and how the M.S. program's courses or rotations will close it. Avoid clichéd non-answers like 'I work too hard.'"
  }, {
    q: "What are your long-term goals?",
    a: "Describe a trajectory: M.S. → Ph.D. → specific career outcome. Connect it to a real problem you want to solve. Interviewers want to see that the M.S. is a deliberate step, not just a credential."
  }, {
    q: "Tell me about your research experience.",
    a: "Structure it as: (1) What is the problem? (2) Why does it matter? (3) What did you do? (4) What did you find or design? (5) What are the limitations and next steps? Be honest about what is design-stage vs. executed work."
  }]
}, {
  id: "research",
  label: "Part 3",
  title: "Research Discussion",
  duration: "~10–15 min",
  icon: "🧬",
  color: "#7a4f8a",
  questions: [{
    q: "What specific aspect of [Professor X]'s research interests you most?",
    a: "Name a specific paper or research theme, not just 'your lab's work on X.' Explain why it connects to a real scientific question you care about. Cite a methodological approach or a biological problem the lab is tackling."
  }, {
    q: "How would you contribute to this lab?",
    a: "Offer three concrete things: (1) a technical skill you already have that the lab uses, (2) a unique perspective (clinical, computational, cross-disciplinary), and (3) a project or problem you've independently worked on that demonstrates research initiative."
  }, {
    q: "If you could design a project in this lab, what would it be?",
    a: "Start with a biological question. Explain how you'd use the lab's existing methods or tools to address it. Connect it to your own background or prior work. Keep it feasible for an M.S. student."
  }, {
    q: "How does your background align with this lab's methods?",
    a: "Be specific about tools and techniques. If you've used RNA-seq pipelines, Python, DESeq2, BLAST, or similar tools, say so explicitly. Connect each to a concrete thing the lab does."
  }]
}, {
  id: "yourquestions",
  label: "Part 4",
  title: "Your Questions",
  duration: "~5 min",
  icon: "💬",
  color: "#8a6a3d",
  questions: [{
    q: "What does the rotation or lab placement process look like for first-year M.S. students?",
    a: null
  }, {
    q: "Are there opportunities for M.S. students to collaborate across divisions (e.g., computational + wet lab)?",
    a: null
  }, {
    q: "What support exists for M.S. students interested in transitioning to the Ph.D. track?",
    a: null
  }, {
    q: "⚠️ Avoid: asking about stipends, housing, or logistics. Ask only about research, training, and academic growth.",
    a: null,
    warning: true
  }]
}];
const tipsData = {
  en: [{
    icon: "🎯",
    title: "Answer structure",
    body: "For technical questions: DEFINE → EXPLAIN → CONNECT TO APPLICATION. Never just dump facts."
  }, {
    icon: "⏸️",
    title: "Pausing is allowed",
    body: "'Let me think for a moment.' Pausing briefly shows rigor, not weakness."
  }, {
    icon: "🤷",
    title: "If you don't know",
    body: "Say: 'I haven't studied this in depth yet, but based on my understanding of [related concept], I'd reason that...' Intellectual honesty beats bluffing every time."
  }, {
    icon: "📄",
    title: "Be specific about faculty",
    body: "Mention paper titles and specific research themes. Generic praise is unconvincing to experienced interviewers."
  }, {
    icon: "🔠",
    title: "Key vocabulary to use naturally",
    body: "Gene regulatory networks · single-cell transcriptomics · translational relevance · multimodal integration · chromatin remodeling · genomic heterogeneity · cell identity · epigenetic regulation · precision medicine"
  }, {
    icon: "👔",
    title: "Presentation",
    body: "Dress professionally (business casual minimum). For virtual: test audio/video, neutral background, good lighting, backup device ready."
  }],
  ar: [{
    "icon": "🎯",
    "title": "بنية الإجابة",
    "body": "في الأسئلة التقنية: عرّف ← اشرح ← اربط بالتطبيق. لا تكتفِ بسرد المعلومات."
  }, {
    "icon": "⏸️",
    "title": "التوقف القصير مسموح",
    "body": "'دعني أفكر للحظة.' التوقف القصير يظهر الدقة، وليس الضعف."
  }, {
    "icon": "🤷",
    "title": "إذا كنت لا تعرف",
    "body": "قل: 'لم أدرس هذا بعمق بعد، لكن بناءً على فهمي لـ [المفهوم المرتبط]، أستنتج أن...' الأمانة العلمية أفضل من التظاهر بالمعرفة في كل مرة."
  }, {
    "icon": "📄",
    "title": "كن محددًا عند الحديث عن أعضاء هيئة التدريس",
    "body": "اذكر عناوين الأوراق البحثية والموضوعات البحثية المحددة. المديح العام لا يقنع المحاورين أصحاب الخبرة."
  }, {
    "icon": "🔠",
    "title": "مصطلحات مهمة لاستخدامها بشكل طبيعي",
    "body": "شبكات تنظيم الجينات · ترانسكريبتوميات الخلية الواحدة · الأهمية الانتقالية · التكامل متعدد الوسائط · إعادة تشكيل الكروماتين · التغاير الجينومي · هوية الخلية · التنظيم اللاجيني · الطب الدقيق"
  }, {
    "icon": "👔",
    "title": "الحضور",
    "body": "ارتدِ ملابس مهنية، والحد الأدنى هو اللباس الرسمي الخفيف. للمقابلة الافتراضية: اختبر الصوت والفيديو، اختر خلفية محايدة، جهّز إضاءة جيدة، واجعل جهازًا احتياطيًا جاهزًا."
  }]
};
const checklistData = {
  en: ["Test video/audio. Have a backup device ready.", "Prepare a quiet, well-lit space with a neutral background.", "Rehearse your 90-second introduction out loud.", "Re-read the faculty member's 2-3 most recent papers and note specific findings.", "Write down 3 specific questions to ask the interviewer.", "Review the Exam Traps section one more time.", "Get 7-8 hours of sleep."],
  ar: ["اختبر الفيديو والصوت. جهّز جهازًا احتياطيًا.", "حضّر مكانًا هادئًا ومضاءً جيدًا بخلفية محايدة.", "تمرّن بصوت عالٍ على مقدمتك التي مدتها 90 ثانية.", "أعد قراءة آخر 2-3 أوراق بحثية لعضو هيئة التدريس، وسجّل نتائج محددة.", "اكتب 3 أسئلة محددة لطرحها على المحاور.", "راجع قسم أخطاء الاختبار الشائعة مرة أخيرة.", "نم 7-8 ساعات."]
};
const partsAr = {
  "background": {
    "label": "Part 1 · ~5 دقائق",
    "title": "👤 الخلفية العامة",
    "questions": [{
      "q": "حدثني عن نفسك.",
      "a": "ابدأ بدرجتك، GPA، وأي خبرة سريرية أو بحثية لديك. ثم اربط كيف دفعتك هذه الخلفية للاهتمام بـBioscience. اذكر التدريب العملي مثل المعلوماتية الحيوية، دورات المختبر، أو المشاريع المستقلة، واختم بجملة واحدة عن الشيء الذي تريد ترسيخه من خلال M.S."
    }, {
      "q": "لماذا هذا البرنامج / لماذا هذه الجامعة؟",
      "a": "اذكر البيئة متعددة التخصصات بوضوح: دمج أحياء المختبر الرطب مع الطرق الحاسوبية، الوصول إلى أعضاء هيئة تدريس مناسبين، والتركيز على البحث الانتقالي أو البحث على مستوى الأنظمة. تجنب الإجابات العامة؛ سم مختبرًا أو مركزًا أو مبادرة حديثة محددة."
    }, {
      "q": "ما أكبر نقطة ضعف أو فجوة لديك؟",
      "a": "كن صادقًا ومحددًا، مثل محدودية خبرة المختبر الرطب أو محدودية خلفية الإحصاء. ثم اشرح ما فعلته لمعالجة ذلك، وكيف ستغلق مقررات أو دورات M.S. هذه الفجوة. تجنب الإجابات المستهلكة مثل: أنا أعمل بجد أكثر من اللازم."
    }, {
      "q": "ما أهدافك طويلة المدى؟",
      "a": "صف مسارًا واضحًا: M.S. → Ph.D. → نتيجة مهنية محددة. اربطه بمشكلة حقيقية تريد حلها. يريد المقابلون رؤية أن M.S. خطوة مقصودة، لا مجرد شهادة."
    }, {
      "q": "حدثني عن خبرتك البحثية.",
      "a": "نظم إجابتك هكذا: (1) ما المشكلة؟ (2) لماذا هي مهمة؟ (3) ماذا فعلت؟ (4) ماذا وجدت أو صممت؟ (5) ما القيود والخطوات التالية؟ كن صادقًا بشأن ما هو في مرحلة التصميم وما نُفذ فعليًا."
    }]
  },
  "research": {
    "label": "Part 3 · ~10-15 دقيقة",
    "title": "🧬 مناقشة البحث",
    "questions": [{
      "q": "ما الجانب المحدد من أبحاث [Professor X] الذي يهمك أكثر؟",
      "a": "اذكر ورقة محددة أو محورًا بحثيًا محددًا، وليس فقط: عمل مختبركم في X. اشرح لماذا يرتبط بسؤال علمي حقيقي يهمك. اذكر منهجًا تقنيًا أو مشكلة بيولوجية يتعامل معها المختبر."
    }, {
      "q": "كيف ستساهم في هذا المختبر؟",
      "a": "قدم ثلاثة أشياء ملموسة: (1) مهارة تقنية لديك ويستخدمها المختبر، (2) منظور فريد مثل السريري أو الحاسوبي أو متعدد التخصصات، و(3) مشروع أو مشكلة عملت عليها بشكل مستقل وتثبت مبادرتك البحثية."
    }, {
      "q": "لو استطعت تصميم مشروع في هذا المختبر، ماذا سيكون؟",
      "a": "ابدأ بسؤال بيولوجي. اشرح كيف ستستخدم طرق أو أدوات المختبر الحالية للإجابة عنه. اربطه بخلفيتك أو عملك السابق. اجعله واقعيًا لطالب M.S."
    }, {
      "q": "كيف تتوافق خلفيتك مع طرق هذا المختبر؟",
      "a": "كن محددًا في الأدوات والتقنيات. إذا استخدمت مسارات RNA-seq أو Python أو DESeq2 أو BLAST أو أدوات مشابهة، قل ذلك بوضوح. اربط كل أداة بشيء محدد يفعله المختبر."
    }]
  },
  "yourquestions": {
    "label": "Part 4 · ~5 دقائق",
    "title": "💬 أسئلتك",
    "questions": [{
      "q": "كيف تبدو عملية التدوير أو التسكين في المختبر لطلاب M.S. في السنة الأولى؟",
      "a": null
    }, {
      "q": "هل توجد فرص لطلاب M.S. للتعاون بين الأقسام، مثل الحوسبة + المختبر الرطب؟",
      "a": null
    }, {
      "q": "ما الدعم المتاح لطلاب M.S. المهتمين بالانتقال إلى مسار Ph.D.؟",
      "a": null
    }, {
      "q": "⚠️ تجنب: السؤال عن الراتب، السكن، أو الأمور اللوجستية. اسأل فقط عن البحث، التدريب، والنمو الأكاديمي.",
      "a": null,
      "warning": true
    }]
  }
};
const scienceTopicsAr = [{
  "name": "A. بنية الخلية والعضيات",
  "foundation": [{
    "label": "Cell",
    "def": "الوحدة البنيوية والوظيفية الأساسية في جميع الكائنات الحية. محاطة بغشاء بلازمي. تحتوي على المادة الوراثية (DNA)."
  }, {
    "label": "Prokaryotic cell",
    "def": "لا تحتوي على نواة محاطة بغشاء. يوجد DNA في منطقة النوكليويد. ريبوسوماتها أصغر (70S). أمثلة: البكتيريا والعتائق. لا تحتوي على عضيات مثل الميتوكوندريا أو ER."
  }, {
    "label": "Eukaryotic cell",
    "def": "تحتوي على نواة محاطة بغشاء. ريبوسوماتها أكبر (80S). تحتوي على عضيات محاطة بغشاء مثل الميتوكوندريا وER وجهاز Golgi والليزوسومات. كروموسوماتها خطية ومرتبطة بالهيستونات."
  }, {
    "label": "Plasma membrane",
    "def": "طبقة ثنائية من الفوسفوليبيدات مع بروتينات مدمجة. نموذج الفسيفساء السائل: الغشاء سائل وتتحرك البروتينات جانبيًا. يحتوي على الكوليسترول لتثبيت السيولة، وبروتينات متكاملة تعبر الغشاء، وبروتينات محيطية مرتبطة بالسطح."
  }, {
    "label": "Nucleus",
    "def": "غشاء مزدوج يعرف بالغلاف النووي ويحتوي على مسام نووية. يحتوي على الكروماتين (DNA + هيستونات). بداخلها النوية: موقع تصنيع RNA الريبوسومي (rRNA). تتحكم في التعبير الجيني وانقسام الخلية."
  }, {
    "label": "Mitochondria",
    "def": "غشاء مزدوج. الغشاء الداخلي مطوي إلى أعراف تسمى cristae لزيادة مساحة إنتاج ATP. تحتوي على DNA دائري خاص بها ينتقل وراثيًا من الأم. موقع الفسفرة التأكسدية ودورة حمض الستريك."
  }, {
    "label": "Rough ER",
    "def": "مرصع بالريبوسومات. يصنع البروتينات الموجهة للإفراز أو الإدخال في الغشاء أو النقل إلى الليزوسومات."
  }, {
    "label": "Smooth ER",
    "def": "لا يحتوي على ريبوسومات. يصنع الدهون، ويساعد في إزالة سمية الأدوية، ويخزن الكالسيوم."
  }, {
    "label": "Golgi apparatus",
    "def": "تراكيب مكدسة من أكياس غشائية مسطحة. يستقبل البروتينات من ER، ويعدلها مثل الغلكزة والفسفرة، ثم يفرزها ويعبئها في حويصلات للإفراز أو التوصيل إلى عضيات أخرى."
  }, {
    "label": "Lysosomes",
    "def": "حويصلات محاطة بغشاء تحتوي على إنزيمات محللة مائيًا. تعمل عند pH يقارب 5. تهضم الجزيئات الكبيرة والعضيات التالفة (الالتهام الذاتي) والمواد الغريبة (البلعمة). عيوبها تسبب أمراض التخزين الليزوسومي مثل Tay-Sachs."
  }, {
    "label": "Peroxisomes",
    "def": "تحتوي على إنزيمات مؤكسدة مثل catalase وoxidases. تكسر الأحماض الدهنية عبر beta-oxidation. تزيل سمية H2O2. تستخدم تفاعلات أكسدة وليس تحللًا مائيًا، وتعمل عند pH متعادل. وهي مختلفة عن الليزوسومات."
  }, {
    "label": "Cytoskeleton",
    "def": "الخيوط الدقيقة (actin، 7nm، شكل الخلية وحركتها)، والخيوط المتوسطة (keratin، 10nm، القوة الميكانيكية)، والأنابيب الدقيقة (tubulin، 25nm، النقل داخل الخلية ومغزل الانقسام)."
  }],
  "traps": ["بدائيات النوى = ريبوسومات 70S. حقيقيات النوى = 80S. الميتوكوندريا لديها أيضًا 70S، وهذا دليل على endosymbiosis.", "Smooth ER لا يصنع البروتينات. هذا دور Rough ER.", "الليزوسومات تستخدم التحلل المائي عند pH حمضي. البيروكسيسومات تستخدم الأكسدة عند pH متعادل. لا تخلط بينها.", "المسام النووية انتقائية؛ تستخدم إشارات التوطين النووي (NLS) وimportins/exportins. ليست ثقوبًا مفتوحة."],
  "qas": [{
    "q": "صف بنية غشاء الخلية ووظيفته.",
    "a": "غشاء الخلية طبقة ثنائية من الفوسفوليبيدات تحتوي على بروتينات مدمجة، ويوصف بنموذج الفسيفساء السائل. للفوسفوليبيدات رؤوس محبة للماء تتجه نحو الماء، وذيول كارهة للماء تتجه نحو الداخل. البروتينات المتكاملة أو العابرة للغشاء تمتد عبر الطبقة الثنائية وتعمل كقنوات وناقلات ومستقبلات. البروتينات المحيطية ترتبط بالسطح وتشارك في الإشارة والبنية. ينظم الكوليسترول سيولة الغشاء. الغشاء انتقائي النفاذية، ويتحكم في دخول وخروج المواد عبر الانتشار البسيط، والانتشار الميسر، والنقل النشط، والنقل بالحويصلات."
  }]
}, {
  "name": "B. بنية DNA والجينات والكروموسومات",
  "foundation": [{
    "label": "DNA structure",
    "def": "لولب مزدوج السلسلة. هيكل سكر-فوسفات. القواعد: A-T برابطتين هيدروجينيتين، وG-C بثلاث روابط هيدروجينية. السلسلتان متعاكستا الاتجاه (5'→3' و3'→5'). يخزن المعلومات الوراثية."
  }, {
    "label": "Gene",
    "def": "قطعة من DNA تشفر منتجًا وظيفيًا، إما بروتينًا أو RNA وظيفيًا. تشمل مناطق تنظيمية مثل promoter وenhancers، وإكسونات مشفرة، وإنترونات غير مشفرة."
  }, {
    "label": "Chromosome",
    "def": "جزيء DNA واحد طويل معبأ مع بروتينات الهيستون في كروماتين. في الإنسان: 46 كروموسومًا (22 زوجًا جسميًا + XX أو XY). Euchromatin = مفكك نسبيًا ونشط نسخيًا. Heterochromatin = مكدس بإحكام وصامت نسخيًا."
  }, {
    "label": "Nucleosome",
    "def": "الوحدة الأساسية للكروماتين. نحو 147 bp من DNA ملتفة حول أوكتامر من الهيستونات (نسختان من كل من H2A وH2B وH3 وH4). هيستون الرابط H1 يثبت البنية الأعلى تنظيمًا."
  }, {
    "label": "Telomeres",
    "def": "تسلسلات متكررة (TTAGGG) في نهايات الكروموسومات. تحمي من التحلل والاندماج. تقصر مع كل انقسام خلوي (حد Hayflick). يطيلها telomerase في الخلايا الجذعية والخلايا السرطانية."
  }, {
    "label": "DNA Replication",
    "def": "شبه محافظ: كل جزيء جديد يحتوي على سلسلة أبوية وسلسلة جديدة واحدة (تجربة Meselson-Stahl). في حقيقيات النوى توجد عدة أصول للتضاعف."
  }, {
    "label": "Key replication enzymes",
    "def": "Helicase يفك اللولب، Topoisomerase يخفف الشد الالتوائي، Primase يضع بادئ RNA، DNA Pol III يصنع السلسلة 5'→3'، DNA Pol I يزيل البوادئ، وLigase يصل شظايا Okazaki."
  }, {
    "label": "Leading vs. lagging strand",
    "def": "السلسلة القائدة: تصنع باستمرار باتجاه شوكة التضاعف. السلسلة المتأخرة: تصنع على شكل شظايا Okazaki متقطعة بعيدًا عن الشوكة، ثم يصلها Ligase لاحقًا."
  }],
  "traps": ["DNA polymerase يستطيع التصنيع فقط باتجاه 5'→3'. لا يستطيع العمل باتجاه 3'→5'.", "بوادئ RNA مطلوبة لأن DNA polymerase لا يستطيع بدء التصنيع de novo.", "قصر telomere يفسر حد Hayflick، أي عدد الانقسامات المحدود في الخلايا الطبيعية.", "يمتلك DNA polymerase نشاط proofreading من نوع 3'→5' exonuclease. معدل الخطأ بعد التدقيق: نحو 1 في 10^9 قاعدة."],
  "qas": [{
    "q": "صف عملية تضاعف DNA واذكر الإنزيمات الأساسية.",
    "a": "تضاعف DNA شبه محافظ. يفك Helicase اللولب المزدوج عند أصل التضاعف. تثبت بروتينات single-strand binding السلاسل المنفصلة. يخفف Topoisomerase الشد الالتوائي أمام الشوكة. يضع Primase بوادئ RNA قصيرة. يصنع DNA polymerase III DNA جديدًا باتجاه 5'→3'. تصنع السلسلة القائدة باستمرار، أما السلسلة المتأخرة فتصنع على شكل شظايا Okazaki. يزيل DNA polymerase I بوادئ RNA ويملأ الفجوات، بينما يغلق DNA ligase الفواصل. يضمن proofreading عبر نشاط 3'→5' exonuclease في DNA polymerase دقة عالية تبلغ نحو خطأ واحد لكل 10^9 قاعدة."
  }]
}, {
  "name": "C. النسخ (DNA → mRNA)",
  "foundation": [{
    "label": "Transcription",
    "def": "تصنيع جزيء RNA من قالب DNA. يقرأ RNA polymerase سلسلة DNA القالب باتجاه 3'→5' ويصنع RNA باتجاه 5'→3'."
  }, {
    "label": "Eukaryotic RNA Polymerases",
    "def": "RNA Pol I → rRNA. RNA Pol II → mRNA (مشفر للبروتين). RNA Pol III → tRNA و5S rRNA. بدائيات النوى: RNA polymerase واحد."
  }, {
    "label": "5' cap",
    "def": "تضاف 7-methylguanosine إلى نهاية 5' في pre-mRNA. تحميه من التحلل، وتساعد في تعرف الريبوسوم عليه، وتسهل خروجه من النواة. توجد في حقيقيات النوى فقط."
  }, {
    "label": "3' poly-A tail",
    "def": "تضاف نحو 200 نيوكليوتيدة أدينين إلى نهاية 3'. تحمي من تحلل exonuclease، وتساعد في التصدير وكفاءة الترجمة. توجد في حقيقيات النوى فقط."
  }, {
    "label": "Splicing",
    "def": "إزالة الإنترونات ووصل الإكسونات بواسطة spliceosome. التضفير البديل: توليفات مختلفة من الإكسونات تنتج أشكالًا بروتينية مختلفة من جين واحد."
  }],
  "traps": ["بدائيات النوى لا تمتلك 5' cap أو poly-A tail أو splicing.", "سلسلة القالب هي 3'→5'؛ أما mRNA الناتج فهو 5'→3'.", "التضفير البديل مصدر رئيسي لتنوع البروتينات؛ يمكن لجين واحد أن ينتج بروتينات كثيرة.", "RNA Pol II يصنع mRNA. RNA Pol I يصنع rRNA. RNA Pol III يصنع tRNA."],
  "qas": [{
    "q": "ما الفروق الأساسية بين التعبير الجيني في بدائيات النوى وحقيقيات النوى؟",
    "a": "في بدائيات النوى: النسخ والترجمة مقترنان. لا يحتوي mRNA على 5' cap أو poly-A tail أو introns. تنظم الجينات في operons. يوجد RNA polymerase واحد. في حقيقيات النوى: يحدث النسخ في النواة والترجمة في السيتوبلازم. يحتاج mRNA إلى معالجة تشمل 5' cap وpoly-A tail وsplicing. توجد ثلاثة RNA polymerases (I وII وIII). يتم التنظيم على مستويات متعددة: الكروماتين، النسخ، ما بعد النسخ، الترجمة، وما بعد الترجمة."
  }, {
    "q": "ما هو التضفير البديل ولماذا هو مهم؟",
    "a": "التضفير البديل هو عملية يمكن من خلالها معالجة pre-mRNA واحد لتضمين أو استبعاد توليفات مختلفة من الإكسونات، مما ينتج عدة نسخ mRNA مختلفة وأشكالًا بروتينية مختلفة من جين واحد. يمكن لنحو 20,000 جين بشري أن ينتج أكثر من 100,000 بروتين مميز. اضطرابه مرتبط بالعديد من الأمراض، ومنها السرطان والاضطرابات العصبية."
  }]
}, {
  "name": "D. الترجمة (mRNA → Protein)",
  "foundation": [{
    "label": "Translation",
    "def": "تصنيع سلسلة polypeptide من قالب mRNA. يحدث على الريبوسومات في السيتوبلازم."
  }, {
    "label": "Codon",
    "def": "ثلاث نيوكليوتيدات من mRNA تحدد حمضًا أمينيًا واحدًا أو إشارة توقف. الشفرة الوراثية مترادفة، وشبه عالمية، وغير متداخلة."
  }, {
    "label": "Start codon",
    "def": "AUG (methionine). يشير إلى بداية الترجمة."
  }, {
    "label": "Stop codons",
    "def": "UAA وUAG وUGA. تتعرف عليها عوامل الإنهاء وليس tRNA."
  }, {
    "label": "Ribosome sites",
    "def": "موقع A (aminoacyl): يرتبط به tRNA المشحون الداخل. موقع P (peptidyl): يحمل tRNA المرتبط بسلسلة polypeptide النامية. موقع E (exit): يخرج منه tRNA الفارغ."
  }, {
    "label": "Elongation",
    "def": "يدخل tRNA المشحون إلى موقع A. تتكون رابطة ببتيدية يحفزها peptidyl transferase ribozyme في الوحدة الكبرى. يتحرك الريبوسوم كودونًا واحدًا. يحتاج إلى عوامل الاستطالة وGTP."
  }, {
    "label": "Post-translational modifications",
    "def": "الطي (chaperones: Hsp70 وHsp60)، والقطع (signal peptides)، والغلكزة (ER وGolgi)، والفسفرة (kinases)، وubiquitination التي تضع علامة للتحلل في proteasome."
  }],
  "traps": ["Peptidyl transferase هو RIBOZYME، أي إنزيم قائم على RNA، وليس إنزيمًا بروتينيًا.", "الشفرة الوراثية مترادفة لكنها ليست غامضة: كل codon يحدد حمضًا أمينيًا واحدًا فقط.", "كودونات التوقف تتعرف عليها release FACTORS وليس جزيئات tRNA."],
  "qas": [{
    "q": "ما العقيدة المركزية في الأحياء الجزيئية؟",
    "a": "تنص العقيدة المركزية على أن المعلومات الوراثية تنتقل من DNA إلى RNA إلى البروتين. يتضاعف DNA (DNA→DNA)، وينسخ إلى mRNA (DNA→RNA)، ويترجم إلى بروتين (RNA→protein). توجد استثناءات: يحول reverse transcriptase RNA إلى DNA في retroviruses مثل HIV، ويحدث تضاعف RNA في فيروسات RNA."
  }]
}, {
  "name": "E. تنظيم الجينات وعلم التخلق",
  "foundation": [{
    "label": "Histone acetylation",
    "def": "تضاف بواسطة HATs. ترخي الكروماتين وتزيد النسخ. إزالة الأسيتيل بواسطة HDACs تكثف الكروماتين وتقلل النسخ."
  }, {
    "label": "DNA methylation",
    "def": "إضافة مجموعات ميثيل إلى السيتوزين في CpG dinucleotides. غالبًا تكتم التعبير الجيني. يمكن توريثها عبر الانقسامات الخلوية. الميثلة الشاذة تكتم promoters لجينات كابحة للورم في السرطان."
  }, {
    "label": "MicroRNA (miRNA)",
    "def": "RNA صغير غير مشفر (~22 nt). يرتبط بمنطقة 3' UTR في mRNA الهدف → تحلل mRNA أو كبح الترجمة. تنظيم بعد النسخ."
  }, {
    "label": "siRNA (RNAi)",
    "def": "RNA مزدوج السلسلة يعالجه Dicer إلى شظايا بطول ~21 nt. يحمل في مركب RISC. يوجه قطع mRNA المكمّل. يستخدم تجريبيًا لإسكات الجينات."
  }, {
    "label": "Epigenetics",
    "def": "تغيرات موروثة في التعبير الجيني لا تغير تسلسل DNA. الآليات: مثيلة DNA، تعديل الهيستونات، وRNA غير مشفر."
  }, {
    "label": "X-inactivation",
    "def": "في الإناث، يعطل أحد كروموسومي X عشوائيًا في كل خلية ويكوّن Barr body. يتوسط ذلك RNA غير مشفر يسمى XIST."
  }],
  "traps": ["يتطلب Lac operon وجود اللاكتوز وغياب الجلوكوز معًا للوصول إلى أعلى تعبير.", "التغيرات اللاجينية موروثة لكنها قابلة للعكس، بخلاف طفرات DNA.", "مثيلة DNA غالبًا تكتم الجينات؛ أما أستلة الهيستونات فتفعلها.", "يرتبط miRNA بمنطقة 3' UTR في mRNA الهدف؛ ولا يغير DNA."],
  "qas": [{
    "q": "ما هو علم التخلق؟ أعطِ أمثلة.",
    "a": "يشير علم التخلق إلى تغيرات موروثة في التعبير الجيني لا تغير تسلسل DNA الأساسي. الآليات الرئيسية الثلاث هي: (1) مثيلة DNA، غالبًا في جزر CpG، وهي عادة تكتم التعبير الجيني؛ (2) تعديل الهيستونات، بما في ذلك الأستلة التي تنشط، والميثلة التي قد تنشط أو تكتم؛ (3) RNAs غير مشفرة مثل microRNAs. أمثلة: تعطيل كروموسوم X في الإناث، والبصمة الجينية، والتمايز الخلوي."
  }]
}, {
  "name": "F. دورة الخلية والانقسام المتساوي والانقسام المنصف",
  "foundation": [{
    "label": "G1 phase",
    "def": "نمو الخلية، تضاعف العضيات، والتحضير لتصنيع DNA. نقطة تفتيش G1/S: تفحص تلف DNA، وحجم الخلية، وإشارات النمو."
  }, {
    "label": "S phase",
    "def": "يحدث تضاعف DNA. يتضاعف كل كروموسوم لتكوين كروماتيدين شقيقين مرتبطين عند السنترومير."
  }, {
    "label": "Mitosis result",
    "def": "ينتج خليتين بنتين ثنائيتين ومتطابقتين وراثيًا. يستخدم للنمو والإصلاح."
  }, {
    "label": "Meiosis I (reductional)",
    "def": "تقترن الكروموسومات المتماثلة (synapsis). يحدث العبور بين كروماتيدات غير شقيقة لتوليد تنوع وراثي. تنفصل الأزواج المتماثلة. النتيجة: خليتان أحاديتا المجموعة الصبغية."
  }, {
    "label": "Meiosis II (equational)",
    "def": "يشبه الانقسام المتساوي. تنفصل الكروماتيدات الشقيقة. النتيجة: أربع خلايا أحادية المجموعة الصبغية ومميزة وراثيًا."
  }],
  "traps": ["Mitosis → خليتان ثنائيتان ومتماثلتان. Meiosis → أربع خلايا أحادية وفريدة.", "يحدث العبور في Meiosis I فقط، بين كروماتيدات غير شقيقة في كروموسومات متماثلة.", "نقطة تفتيش المغزل تكون في METAPHASE. تفحص ارتباط الكينيتوكور.", "عدم الانفصال (فشل الانفصال) → aneuploidy: trisomy أو monosomy."],
  "qas": [{
    "q": "ما الفرق بين mitosis وmeiosis؟",
    "a": "ينتج mitosis خليتين بنتين ثنائيتين ومتماثلتين وراثيًا، ويستخدم للنمو والإصلاح. ينتج meiosis أربع أمشاج أحادية وفريدة وراثيًا، ويستخدم للتكاثر الجنسي. الفروق الأساسية: يحتوي meiosis على جولتين من الانقسام؛ يحدث العبور والتوزيع المستقل في Meiosis I لتوليد التنوع الوراثي؛ تقترن الكروموسومات المتماثلة وتنقسم في Meiosis I كقسم اختزالي، بينما تنفصل الكروماتيدات الشقيقة في Meiosis II وفي mitosis."
  }]
}, {
  "name": "G. تقنيات الأحياء الجزيئية",
  "foundation": [{
    "label": "PCR",
    "def": "يضخم مقاطع DNA محددة خارج الجسم الحي. خطوات كل دورة: (1) Denaturation نحو 95°C، (2) Annealing نحو 55-65°C، (3) Extension نحو 72°C. التضخيم أسي: 2^n نسخة بعد n دورة."
  }, {
    "label": "CRISPR-Cas9",
    "def": "يوجه guide RNA (gRNA) إنزيم Cas9 nuclease إلى تسلسل DNA محدد مجاور لـ PAM (NGG في SpCas9). يحدث Cas9 قطعًا مزدوج السلسلة. الإصلاح: NHEJ (indels) أو HDR (تعديل دقيق باستخدام قالب)."
  }, {
    "label": "RNA-seq",
    "def": "يسلسل كل RNA في العينة. سير العمل: استخراج RNA → النسخ العكسي إلى cDNA → التجزئة → التسلسل → المحاذاة → القياس الكمي. يكشف التضفير البديل، والنصوص الجديدة، والتعبير التفاضلي."
  }, {
    "label": "Blots",
    "def": "Southern = كشف DNA. Northern = كشف RNA. Western = كشف البروتين."
  }, {
    "label": "BLAST",
    "def": "Basic Local Alignment Search Tool. يقارن تسلسل الاستعلام بقاعدة بيانات. يشمل الناتج E-values، وكلما كانت أقل كان التطابق أكثر دلالة."
  }],
  "traps": ["يتطلب PCR بوادئ PRIMERS قصيرة من DNA. لا يمتلك Taq polymerase نشاط proofreading، لذلك دقته أقل.", "يستخدم CRISPR دليلًا من RNA، وليس DNA، لتوجيه Cas9 إلى الهدف.", "يقيس RNA-seq وفرة mRNA، وليس مستويات البروتين.", "يقوم BLAST بمحاذاة LOCAL، وليس global."],
  "qas": [{
    "q": "ما هو CRISPR-Cas9 وكيف يعمل؟",
    "a": "CRISPR-Cas9 تقنية لتحرير الجينوم مشتقة من نظام مناعي تكيفي بكتيري. تتكون من guide RNA (gRNA) مكمّل لتسلسل DNA الهدف، ومن إنزيم Cas9 endonuclease الذي يحدث قطعًا مزدوج السلسلة في الموقع الهدف المجاور لتسلسل PAM (NGG في SpCas9). بعد القطع، تصلح الخلية الكسر عبر NHEJ الذي يدخل إدخالات أو حذوفات تعطل الجين، أو عبر HDR الذي يستخدم قالبًا مزودًا لإجراء تعديلات دقيقة. تشمل التطبيقات gene knockout، وتصحيح الجينات، ونمذجة الأمراض، والتطبيقات العلاجية."
  }, {
    "q": "ما الفرق بين RNA-seq وmicroarrays؟",
    "a": "تستخدم microarrays التهجين مع probes مصممة مسبقًا لتسلسلات معروفة؛ مداها الديناميكي محدود ولا تكشف النصوص الجديدة. يستخدم RNA-seq تقنيات next-generation sequencing لتسلسل كل جزيئات RNA مباشرة؛ ويمكنه كشف النصوص الجديدة، وأحداث التضفير البديل، وله مدى ديناميكي أوسع. لقد حل RNA-seq محل microarrays بدرجة كبيرة في معظم دراسات transcriptomics."
  }]
}, {
  "name": "H. الإشارة الخلوية",
  "foundation": [{
    "label": "Signal transduction",
    "def": "العملية التي تتحول فيها إشارة خارج خلوية إلى استجابة داخل خلوية."
  }, {
    "label": "Receptor tyrosine kinases (RTKs)",
    "def": "ارتباط ligand يسبب dimerization وautophosphorylation لبقايا التيروزين. ينشط Ras-MAPK لتكاثر الخلايا وPI3K-Akt لبقاء الخلايا. الطفرات شائعة في السرطان مثل EGFR وHER2."
  }, {
    "label": "GPCRs",
    "def": "أكبر عائلة من المستقبلات. تحتوي على سبعة نطاقات عابرة للغشاء. ارتباط ligand ينشط G-protein عبر تبادل GDP → GTP. ينشط G-protein المؤثرات مثل adenylyl cyclase (→ cAMP) أو phospholipase C (→ IP3 وDAG)."
  }, {
    "label": "Apoptosis (intrinsic)",
    "def": "المسار الميتوكوندري. تلف DNA → إطلاق cytochrome c → تكوين apoptosome → تنشيط caspase-9 → caspase-3 (المنفذ)."
  }, {
    "label": "Apoptosis (extrinsic)",
    "def": "مسار مستقبلات الموت. يرتبط FasL بمستقبل Fas → تكوين DISC → تنشيط caspase-8 → caspase-3. يتلاقى المساران عند caspase-3."
  }, {
    "label": "Necrosis vs. apoptosis",
    "def": "Necrosis: غير مضبوط، تورم الخلية، تمزق الغشاء → التهاب. Apoptosis: مبرمج ومنظم، انكماش الخلية، blebbing في الغشاء، وتبتلع الأجسام apoptotic bodies → لا يوجد التهاب."
  }],
  "traps": ["Apoptosis لا يسبب التهابًا، بخلاف necrosis.", "Ras هو GTPase. الطفرات المسرطنة تبقيه مرتبطًا بـ GTP بشكل دائم → إشارة تكاثر مستمرة.", "غالبًا يتضمن السرطان كسب وظيفة في oncogenes وفقد وظيفة في tumor suppressors في الوقت نفسه."],
  "qas": [{
    "q": "ما هو apoptosis وكيف يختلف عن necrosis؟",
    "a": "Apoptosis هو موت خلوي مبرمج: منظم، معتمد على الطاقة، ولا يسبب التهابًا. من علاماته: انكماش الخلية، تكثف الكروماتين، blebbing في الغشاء، وتكوين apoptotic bodies تبتلعها الخلايا. له مساران: داخلي ميتوكوندري عبر إطلاق cytochrome c وcaspase-9، وخارجي عبر مستقبلات الموت Fas/FasL وcaspase-8. يتلاقى المساران عند caspase-3. أما necrosis فهو موت خلوي غير مضبوط بسبب إصابة أو عدوى: تورم الخلية، تمزق الغشاء، وإطلاق محتويات الخلية مما يسبب الالتهاب."
  }]
}, {
  "name": "I. بيولوجيا السرطان",
  "foundation": [{
    "label": "Oncogene",
    "def": "شكل متحور من proto-oncogene. طفرة كسب وظيفة. تعزز تكاثر الخلايا حتى دون إشارات مناسبة. أمثلة: Ras وMyc وHER2/Neu."
  }, {
    "label": "Tumor suppressor gene",
    "def": "في الوضع الطبيعي يثبط تكاثر الخلايا أو يعزز apoptosis. طفرة فقد وظيفة تساهم في السرطان. أمثلة: p53 (apoptosis/arrest)، وRb (نقطة تفتيش G1/S)، وBRCA1/BRCA2 (إصلاح DNA)."
  }, {
    "label": "p53",
    "def": "حارس الجينوم. ينشط عند تلف DNA: يسبب (1) إيقاف دورة الخلية عند G1/S عبر p21، (2) تنشيط جينات إصلاح DNA، (3) apoptosis إذا كان الضرر غير قابل للإصلاح. يتحور في أكثر من 50% من سرطانات الإنسان."
  }, {
    "label": "Two-hit hypothesis (Knudson)",
    "def": "يجب تعطيل كلا الأليلين من الجين الكابح للورم حتى تحدث خسارة الوظيفة."
  }, {
    "label": "Hallmarks of cancer",
    "def": "الحفاظ على إشارات التكاثر، وتفادي مثبطات النمو، ومقاومة موت الخلية، وتمكين الخلود التكاثري، وتحفيز تكوين الأوعية، وتنشيط الغزو والانتشار."
  }],
  "traps": ["Oncogene = كسب وظيفة. Tumor suppressor = فقد وظيفة.", "p53 عامل نسخ؛ ينشط الجينات الهدف downstream. لا يصلح DNA مباشرة.", "Two-hit: يجب تعطيل كلا الأليلين حتى يحدث فقد وظيفة الجين الكابح للورم."],
  "qas": [{
    "q": "اشرح دور p53 في بيولوجيا السرطان.",
    "a": "p53 بروتين كابح للورم يعرف بحارس الجينوم. عند اكتشاف تلف DNA، ينشط p53: (1) إيقاف دورة الخلية عند G1/S عبر p21 وهو مثبط CDK؛ (2) جينات إصلاح DNA؛ (3) apoptosis إذا كان الضرر غير قابل للإصلاح. طفرات فقد الوظيفة في p53، الموجودة في أكثر من 50% من سرطانات الإنسان، تزيل هذه الآليات الوقائية. p53 عامل نسخ ينشط مباشرة تعبير الجينات الهدف downstream."
  }]
}, {
  "name": "J. الجينوميات والمعلوماتية الحيوية",
  "foundation": [{
    "label": "Human genome facts",
    "def": "~3.2 مليار زوج قاعدي. نحو 20,000-25,000 جين مشفر للبروتين. فقط نحو 1.5% من الجينوم مشفر للبروتين."
  }, {
    "label": "Differential expression analysis",
    "def": "يقارن التعبير الجيني بين الحالات. سير عمل RNA-seq: محاذاة القراءات → حساب العدادات → التطبيع → الاختبار الإحصائي (يستخدم DESeq2 نموذج negative binomial) → تصحيح الاختبارات المتعددة. يعرض عادة باستخدام volcano plots أو heatmaps."
  }, {
    "label": "AlphaFold",
    "def": "نظام AI من DeepMind يتنبأ بالبنية ثلاثية الأبعاد للبروتين من تسلسل الأحماض الأمينية بدقة قريبة من التجارب."
  }, {
    "label": "scRNA-seq",
    "def": "يقيس single-cell RNA sequencing ترانسكريبتوم الخلايا الفردية. يكشف الأنواع الفرعية للخلايا، والمجموعات النادرة، ومسارات التمايز، وعدم تجانس الأورام. التحليلات تشمل PCA وUMAP وclustering وpseudotime وRNA velocity. وهو محوري في مشروع Human Cell Atlas."
  }],
  "traps": ["فقط نحو 1.5% من الجينوم البشري يشفر البروتينات. الباقي ليس نفايات؛ بل يشمل عناصر تنظيمية وRNAs غير مشفرة.", "Transcriptome ديناميكي ويتغير حسب الظروف. Genome ثابت.", "يقوم BLAST بمحاذاة LOCAL وليس global. E-value: كلما كانت أقل كانت الدلالة الإحصائية أقوى.", "مستويات mRNA لا تتنبأ دائمًا بمستويات البروتين."],
  "qas": [{
    "q": "ما أهمية single-cell RNA sequencing (scRNA-seq)؟",
    "a": "يقيس Bulk RNA-seq متوسط نمط التعبير عبر ملايين الخلايا، مما يخفي التغاير بين الخلايا. يقيس scRNA-seq ترانسكريبتوم الخلايا الفردية، ويكشف: (1) أنواعًا وأنواعًا فرعية مميزة داخل النسيج، (2) مجموعات خلوية نادرة، (3) انتقالات الحالة الخلوية ومسارات التمايز، (4) عدم التجانس في مجموعات خلايا الورم. تشمل طرق التحليل تقليل الأبعاد (PCA وUMAP)، وclustering، وتحليل المسارات (pseudotime)، وRNA velocity. هذه التقنية محورية في مشروع Human Cell Atlas."
  }, {
    "q": "اشرح تحليل التعبير الجيني التفاضلي.",
    "a": "يقارن تحليل التعبير التفاضلي مستويات التعبير الجيني بين حالتين أو أكثر لتحديد الجينات التي ترتفع أو تنخفض بشكل دال. في RNA-seq: (1) محاذاة قراءات التسلسل إلى جينوم مرجعي، (2) حساب read counts لكل جين، (3) التطبيع حسب عمق التسلسل وطول الجين، (4) تطبيق اختبارات إحصائية، حيث يستخدم DESeq2 نموذج negative binomial، (5) تصحيح الاختبارات المتعددة (FDR). تعرض النتائج عادة باستخدام volcano plots أو heatmaps."
  }]
}, {
  "name": "K. الخلايا الجذعية والتمايز",
  "foundation": [{
    "label": "Potency hierarchy",
    "def": "Totipotent: جميع أنواع الخلايا + الأنسجة خارج الجنين مثل الزيجوت. Pluripotent: جميع خلايا الجسم لكن ليس المشيمة مثل ESCs. Multipotent: عدة أنواع خلوية متقاربة. Unipotent: نوع خلوي واحد."
  }, {
    "label": "iPSCs",
    "def": "الخلايا الجذعية المستحثة متعددة القدرات. خلايا جسدية بالغة يعاد برمجتها إلى حالة متعددة القدرات بإدخال عوامل Yamanaka: Oct4 وSox2 وKlf4 وc-Myc. اكتشفها Shinya Yamanaka (جائزة نوبل 2012). تتجنب القضايا الأخلاقية المرتبطة بـ ESCs."
  }],
  "traps": ["Totipotent يمكنه تكوين المشيمة أيضًا؛ Pluripotent لا يستطيع. هذا هو الفرق الأساسي.", "تتجنب iPSCs القضايا الأخلاقية المرتبطة باشتقاق ESC، لأنها لا تتطلب إتلاف جنين.", "التمايز يغير أنماط التعبير الجيني، وليس تسلسل DNA نفسه."],
  "qas": [{
    "q": "ما هي الخلايا الجذعية؟ اشرح الفروق بين embryonic stem cells وiPSCs.",
    "a": "الخلايا الجذعية خلايا غير متمايزة قادرة على التجدد الذاتي والتمايز إلى أنواع خلوية متخصصة. embryonic stem cells (ESCs) مشتقة من الكتلة الخلوية الداخلية في blastocyst؛ وهي متعددة القدرات. iPSCs هي خلايا جسدية بالغة يعاد برمجتها إلى حالة متعددة القدرات بإدخال أربعة عوامل نسخ (Oct4 وSox2 وKlf4 وc-Myc)، اكتشفها Yamanaka عام 2006 ونال عنها نوبل عام 2012. مزايا iPSCs: تتجنب القضايا الأخلاقية لإتلاف الأجنة، ويمكن أن تكون خاصة بالمريض، مما يقلل خطر الرفض المناعي، وتمكن نمذجة الأمراض باستخدام خلايا مشتقة من المريض."
  }]
}];
const navLabelsAr = ["Part 1: الخلفية العامة", "Part 2: العلوم الأساسية", "Part 3: البحث", "Part 4: أسئلتك", "✅ نصائح نهائية"];
function BioscienceInterview() {
  const [lang, setLang] = useStateI('en');
  const [activeSection, setActiveSection] = useStateI("background");
  const [openQs, setOpenQs] = useStateI({});
  const [openTopics, setOpenTopics] = useStateI({});
  const [scienceTab, setScienceTab] = useStateI("foundation");
  useEffectI(function () {
    function handler(e) {
      setLang(e.detail.lang);
      setOpenQs({});
      setOpenTopics({});
    }
    window.addEventListener('langchange', handler);
    return function () {
      window.removeEventListener('langchange', handler);
    };
  }, []);
  const isAr = lang === 'ar';
  const toggleQ = function (key) {
    setOpenQs(function (p) {
      return Object.assign({}, p, {
        [key]: !p[key]
      });
    });
  };
  const toggleTopic = function (key) {
    setOpenTopics(function (p) {
      return Object.assign({}, p, {
        [key]: !p[key]
      });
    });
  };
  const navLabels = isAr ? navLabelsAr : ["Part 1: Background", "Part 2: Science", "Part 3: Research", "Part 4: Your Questions", "✅ Final Tips"];
  const navItems = [{
    id: "background",
    label: navLabels[0],
    color: "#4f7942"
  }, {
    id: "science",
    label: navLabels[1],
    color: ACCENT_I
  }, {
    id: "research",
    label: navLabels[2],
    color: "#7a4f8a"
  }, {
    id: "yourquestions",
    label: navLabels[3],
    color: "#8a6a3d"
  }, {
    id: "tips",
    label: navLabels[4],
    color: "#1a1a1a"
  }];
  const tabLabels = isAr ? ["📚 التعاريف", "⚠️ أخطاء الاختبار الشائعة", "💬 بنك الأسئلة والإجابات الكامل"] : ["📚 Definitions", "⚠️ Exam Traps", "💬 Full Q&A Bank"];
  const tips = tipsData[lang] || tipsData.en;
  const checklist = checklistData[lang] || checklistData.en;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: isAr ? "'Noto Kufi Arabic',sans-serif" : "'Georgia','Times New Roman',serif",
      background: "#faf8f4",
      minHeight: "100vh",
      color: "#1a1a1a",
      direction: isAr ? "rtl" : "ltr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1a1a1a",
      color: "#faf8f4",
      padding: "36px 28px 28px",
      borderBottom: "4px solid #c8a96e"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 860,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: isAr ? 0 : "0.18em",
      textTransform: "uppercase",
      color: "#c8a96e",
      marginBottom: 8,
      fontFamily: "inherit"
    }
  }, isAr ? "التحضير لمقابلة الدراسات العليا · ماجستير العلوم الحيوية" : "Graduate Interview Preparation · M.S. Bioscience"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "clamp(22px,4.5vw,38px)",
      fontWeight: isAr ? 700 : 400,
      margin: "0 0 6px",
      lineHeight: 1.15
    }
  }, isAr ? "مقابلة العلوم الحيوية" : "Bioscience Interview", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#c8a96e"
    }
  }, isAr ? "دليل دراسة كامل" : "Complete Study Guide")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontSize: 14,
      color: "#999",
      maxWidth: 560,
      lineHeight: 1.65,
      fontStyle: isAr ? "normal" : "italic"
    }
  }, isAr ? "إطار من أربعة أجزاء: أسئلة الخلفية، مراجعة كاملة للعلوم الأساسية مع التعاريف، أخطاء الاختبار الشائعة، إجابات نموذجية للأسئلة، مناقشة البحث، وأسئلة المرشح." : "Four-part framework: background questions, full foundational science review with definitions, exam traps, and model Q&A answers, research discussion, and candidate questions."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#f0ece4",
      borderBottom: "1px solid #d8d0c0",
      position: "sticky",
      top: 48,
      zIndex: 49
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 860,
      margin: "0 auto",
      display: "flex",
      overflowX: "auto",
      padding: "0 12px"
    }
  }, navItems.map(function (n) {
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: function () {
        setActiveSection(n.id);
      },
      style: {
        padding: "13px 14px",
        border: "none",
        borderBottom: activeSection === n.id ? "3px solid " + n.color : "3px solid transparent",
        background: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: activeSection === n.id ? 700 : 400,
        color: activeSection === n.id ? n.color : "#666",
        whiteSpace: "nowrap",
        transition: "all 0.15s"
      }
    }, n.label);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 860,
      margin: "0 auto",
      padding: "28px 18px 80px"
    }
  }, ["background", "research", "yourquestions"].includes(activeSection) && function () {
    var partEn = parts.find(function (p) {
      return p.id === activeSection;
    });
    var partArData = partsAr[activeSection];
    var part = isAr && partArData ? {
      ...partEn,
      label: partArData.label,
      title: partArData.title,
      questions: partArData.questions.map(function (q, qi) {
        var enQ = partEn.questions[qi] || {};
        return Object.assign({}, enQ, {
          q: q.q,
          a: q.a
        });
      })
    } : partEn;
    if (!part) return null;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        letterSpacing: isAr ? 0 : "0.12em",
        textTransform: "uppercase",
        color: "#888",
        marginBottom: 5,
        fontFamily: "inherit"
      }
    }, part.label, " \xB7 ", part.duration), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: isAr ? 700 : 400,
        margin: 0
      }
    }, part.icon, " ", part.title)), part.questions.map(function (item, qi) {
      var key = activeSection + "-" + qi;
      var open = openQs[key];
      if (item.warning) return /*#__PURE__*/React.createElement("div", {
        key: key,
        style: {
          padding: "12px 16px",
          background: "#fff8ec",
          border: "1px solid #e8c876",
          borderLeft: isAr ? "none" : "4px solid #c8a96e",
          borderRight: isAr ? "4px solid #c8a96e" : "none",
          borderRadius: 4,
          marginBottom: 10,
          fontSize: 13.5,
          color: "#6a4800",
          lineHeight: 1.6
        }
      }, item.q);
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        style: {
          border: "1px solid #d8d0c0",
          borderLeft: isAr ? "none" : "4px solid " + part.color,
          borderRight: isAr ? "4px solid " + part.color : "none",
          borderRadius: 4,
          marginBottom: 10,
          background: open ? "#fff" : "#faf8f4"
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function () {
          if (item.a) toggleQ(key);
        },
        style: {
          width: "100%",
          textAlign: isAr ? "right" : "left",
          padding: "13px 16px",
          background: "none",
          border: "none",
          cursor: item.a ? "pointer" : "default",
          fontFamily: "inherit",
          fontSize: 14,
          fontWeight: 600,
          color: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          lineHeight: 1.5
        }
      }, item.q), item.a && /*#__PURE__*/React.createElement("span", {
        style: {
          color: part.color,
          fontSize: 18,
          flexShrink: 0
        }
      }, open ? "−" : "+")), open && item.a && /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "0 16px 14px",
          fontSize: 13.5,
          lineHeight: 1.78,
          color: "#333",
          borderTop: "1px solid #ece8e0",
          paddingTop: 14
        }
      }, item.a));
    }));
  }(), activeSection === "science" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: isAr ? 0 : "0.12em",
      textTransform: "uppercase",
      color: "#888",
      marginBottom: 5,
      fontFamily: "inherit"
    }
  }, isAr ? "Part 2 · ~10-15 دقيقة" : "Part 2 · ~10–15 min"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      fontWeight: isAr ? 700 : 400,
      margin: "0 0 6px"
    }
  }, "\uD83D\uDD2C ", isAr ? "العلوم التأسيسية" : "Foundational Science"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#666",
      fontSize: 13.5,
      margin: "0 0 16px",
      fontStyle: isAr ? "normal" : "italic",
      lineHeight: 1.6
    }
  }, isAr ? "توقع حوالي 10 أسئلة من الموضوعات أدناه. لكل موضوع ثلاث طبقات." : "Expect ~10 questions drawn from the topics below. Each topic has three layers.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 20,
      flexWrap: "wrap"
    }
  }, [{
    id: "foundation",
    label: tabLabels[0]
  }, {
    id: "traps",
    label: tabLabels[1]
  }, {
    id: "qas",
    label: tabLabels[2]
  }].map(function (tab) {
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: function () {
        setScienceTab(tab.id);
      },
      style: {
        padding: "8px 16px",
        border: scienceTab === tab.id ? "2px solid " + ACCENT_I : "2px solid #d8d0c0",
        borderRadius: 20,
        background: scienceTab === tab.id ? ACCENT_I : "#fff",
        color: scienceTab === tab.id ? "#fff" : "#555",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 600,
        transition: "all 0.15s"
      }
    }, tab.label);
  })), (isAr ? scienceTopicsAr : scienceTopics).map(function (topic, ti) {
    var key = "sci-" + ti;
    var open = openTopics[key];
    if (scienceTab === "qas" && (!topic.qas || topic.qas.length === 0)) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      style: {
        border: "1px solid #d8d0c0",
        borderLeft: isAr ? "none" : "4px solid " + ACCENT_I,
        borderRight: isAr ? "4px solid " + ACCENT_I : "none",
        borderRadius: 4,
        marginBottom: 10,
        background: open ? "#fff" : "#faf8f4"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        toggleTopic(key);
      },
      style: {
        width: "100%",
        textAlign: isAr ? "right" : "left",
        padding: "13px 16px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: 600,
        color: "#1a1a1a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, topic.name, /*#__PURE__*/React.createElement("span", {
      style: {
        color: ACCENT_I,
        fontSize: 18,
        marginLeft: isAr ? 0 : 8,
        marginRight: isAr ? 8 : 0
      }
    }, open ? "−" : "+")), open && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 16px 16px"
      }
    }, scienceTab === "foundation" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        letterSpacing: isAr ? 0 : "0.1em",
        textTransform: "uppercase",
        color: "#888",
        marginBottom: 10,
        fontFamily: "inherit"
      }
    }, isAr ? "التعاريف الأساسية" : "Core Definitions"), topic.foundation.map(function (item, fi) {
      return /*#__PURE__*/React.createElement("div", {
        key: fi,
        style: {
          display: "flex",
          gap: 12,
          marginBottom: 7,
          padding: "9px 12px",
          background: "#f5f2ec",
          borderRadius: 4,
          fontSize: 13.5,
          lineHeight: 1.65
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 130,
          fontWeight: 700,
          color: ACCENT_I,
          flexShrink: 0,
          fontSize: 12.5,
          paddingTop: 1
        }
      }, item.label), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#2a2a2a"
        }
      }, item.def));
    })), scienceTab === "traps" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        letterSpacing: isAr ? 0 : "0.1em",
        textTransform: "uppercase",
        color: "#888",
        marginBottom: 10,
        fontFamily: "inherit"
      }
    }, isAr ? "أخطاء الاختبار: الأخطاء الشائعة" : "Exam Traps: Common Mistakes"), topic.traps.map(function (trap, tri) {
      return /*#__PURE__*/React.createElement("div", {
        key: tri,
        style: {
          display: "flex",
          gap: 10,
          marginBottom: 7,
          padding: "9px 12px",
          background: "#fff4f4",
          border: "1px solid #f5c0c0",
          borderRadius: 4,
          fontSize: 13.5,
          lineHeight: 1.65,
          color: "#5a1a1a"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flexShrink: 0,
          color: "#c44"
        }
      }, "\u26A0"), /*#__PURE__*/React.createElement("span", null, trap));
    })), scienceTab === "qas" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        letterSpacing: isAr ? 0 : "0.1em",
        textTransform: "uppercase",
        color: "#888",
        marginBottom: 10,
        fontFamily: "inherit"
      }
    }, isAr ? "إجابات نموذجية للأسئلة" : "Model Q&A Answers"), topic.qas.map(function (qa, qi) {
      var qaKey = key + "-qa-" + qi;
      var qaOpen = openQs[qaKey];
      return /*#__PURE__*/React.createElement("div", {
        key: qaKey,
        style: {
          border: "1px solid #d8d0c0",
          borderLeft: isAr ? "none" : "4px solid #4f7942",
          borderRight: isAr ? "4px solid #4f7942" : "none",
          borderRadius: 4,
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function () {
          toggleQ(qaKey);
        },
        style: {
          width: "100%",
          textAlign: isAr ? "right" : "left",
          padding: "11px 14px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 13.5,
          fontWeight: 600,
          color: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          lineHeight: 1.5
        }
      }, isAr ? "س: " : "Q: ", qa.q), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#4f7942",
          fontSize: 17,
          flexShrink: 0,
          marginTop: 1
        }
      }, qaOpen ? "−" : "+")), qaOpen && /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "10px 14px 14px",
          fontSize: 13.5,
          lineHeight: 1.78,
          color: "#333",
          borderTop: "1px solid #ece8e0",
          background: "#f9fff7",
          borderRadius: "0 0 4px 4px"
        }
      }, qa.a));
    }))));
  })), activeSection === "tips" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: isAr ? 0 : "0.12em",
      textTransform: "uppercase",
      color: "#888",
      marginBottom: 5,
      fontFamily: "inherit"
    }
  }, isAr ? "التحضير النهائي" : "Final Preparation"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      fontWeight: isAr ? 700 : 400,
      margin: 0
    }
  }, isAr ? "نصائح يوم المقابلة" : "Interview Day Tips")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12
    }
  }, tips.map(function (tip, ti) {
    return /*#__PURE__*/React.createElement("div", {
      key: ti,
      style: {
        padding: "18px 20px",
        background: "#fff",
        border: "1px solid #d8d0c0",
        borderLeft: isAr ? "none" : "4px solid #1a1a1a",
        borderRight: isAr ? "4px solid #1a1a1a" : "none",
        borderRadius: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        marginBottom: 5,
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17
      }
    }, tip.icon), tip.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: "#444",
        lineHeight: 1.72
      }
    }, tip.body));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      padding: "22px",
      background: "#1a1a1a",
      borderRadius: 6,
      color: "#faf8f4"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#c8a96e",
      letterSpacing: isAr ? 0 : "0.1em",
      textTransform: "uppercase",
      fontFamily: "inherit",
      marginBottom: 12
    }
  }, isAr ? "قائمة الليلة السابقة" : "Night Before Checklist"), checklist.map(function (item, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 7,
        fontSize: 13.5,
        color: "#ddd",
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#c8a96e",
        flexShrink: 0
      }
    }, "\u2713"), item);
  })))));
}
try {
  ReactDOM.createRoot(document.getElementById('interview-root')).render(/*#__PURE__*/React.createElement(BioscienceInterview, null));
} catch (e) {
  document.getElementById('interview-root').innerHTML = '<div style="color:red;padding:40px;font-family:monospace;">Interview Error: ' + e.message + '</div>';
}
