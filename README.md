# AI-Based Early Warning and Landslide Risk Monitoring System in NER

An AI-powered landslide risk monitoring and early-warning system designed for the **Northeastern Region (NER) of India**.

The system combines terrain information, historical landslide records, rainfall data, machine learning, GIS visualization, shelter recommendation, and emergency actions to provide location-based landslide risk information.

---

## 🚨 Problem Statement

The Northeastern Region of India is highly vulnerable to landslides due to:

- Steep and unstable terrain
- Heavy and prolonged rainfall
- Mountainous geography
- Soil and geological conditions
- Increasing infrastructure development
- Limited availability of localized early-warning information

Existing landslide information is often difficult for local users to interpret at a specific location.

This project aims to provide a **location-based landslide risk monitoring and decision-support system** that can help users understand the risk level and identify appropriate emergency actions.

---

## 🎯 Objectives

The main objectives of the project are:

- Predict landslide susceptibility using Machine Learning.
- Combine terrain and rainfall information.
- Generate a location-based risk score.
- Visualize landslide risk using GIS.
- Recommend safer nearby shelters.
- Provide emergency actions based on risk level.
- Support future real-time rainfall and warning integration.
- Provide a foundation for citizen emergency reporting and location sharing.

---

# 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │   Rainfall Data     │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │   DEM / Elevation   │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │   Slope Calculation │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │ Historical Landslide│
                 │       Records       │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │  Data Processing    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Random Forest ML    │
                 │      Model          │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Risk Score        │
                 │      0 - 100        │
                 └──────────┬──────────┘
                            │
            ┌───────────────┼────────────────┐
            │               │                │
            ▼               ▼                ▼
       GIS Risk Map    Shelter Engine    Action Engine
            │               │                │
            └───────────────┼────────────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Frontend / Backend  │
                 └─────────────────────┘
                            │
                            ▼
                    User / Authorities
