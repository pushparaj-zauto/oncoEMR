# Oncology EMR Demo

A modern React-based Electronic Medical Records (EMR) system demo for oncology practice with comprehensive cancer care workflows.

## 🎯 New: Specialized Oncology EMR

This project now includes a **complete Oncology EMR** system designed with 15+ years of oncology expertise, covering the entire cancer journey from diagnosis to treatment.

### 🚀 Quick Start for Oncology EMR

1. **Install & Run**:
```bash
npm install
npm run dev
```

2. **Navigate to Oncology EMR**:
   - Go to `http://localhost:5173/onco`
   - OR click "Open Oncology EMR →" from the home page

3. **Demo Patients Available**:
   - **Ramesh Kumar** - Diagnostic Evaluation
   - **Priya Sharma** - Treatment Planning
   - **Suresh Patel** - Active Chemotherapy
   - **Anjali Desai** - Palliative Care
   - **Vikram Singh** - Maintenance Therapy

### 📚 Documentation

- **[DEMO_GUIDE.md](DEMO_GUIDE.md)** - ⭐ Step-by-step demo instructions
- **[ONCOLOGY_README.md](ONCOLOGY_README.md)** - Complete feature documentation
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical details
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - File organization guide

## Tech Stack
- React 18 with TypeScript
- Vite for fast development
- Material-UI for beautiful, responsive UI
- React Router for navigation

## Features

### General EMR
- Patient information dashboard
- Visit history tracking
- Vitals monitoring
- Allergy management
- Investigation orders (CBC, etc.)
- Clinical notes

### Oncology EMR ✨ NEW
- **Diagnostic Evaluation** - Color-coded status tracker, alerts, pending actions
- **Treatment Planning** - MDT decisions, treatment intent, strategy mapping
- **Chemo Protocol Workspace** - Cycle-based interface, drug administration, outcomes
- **Maintenance Review** - Review-based tracking (no cycles), QoL monitoring
- **Palliative Dashboard** - Pain scores, symptom tracking, quality of life focus
- **Patient Context Bar** - Always-visible patient status and cancer details

## Project Structure
```
src/
├── components/
│   └── onco/              # Oncology-specific components
├── pages/
│   └── onco/              # Oncology screens (6 specialized views)
├── data/
│   └── oncologyMockData.ts # 5 demo patients with clinical data
└── types/
    └── oncology.ts        # Oncology type definitions
```

## Key Concepts (Oncology)

### Treatment Intent vs OncoStatus
- **Intent** (WHY): Curative / Disease Control / Palliative
- **Status** (WHERE): Diagnostic → Planning → Induction → Maintenance

### Cycles Only for Chemotherapy
- ✅ Chemotherapy = Cycle-based UI
- ❌ Maintenance = Review-based UI (NO cycles)
