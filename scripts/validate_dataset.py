from university_pipeline import validate_dataset


if __name__ == "__main__":
    report = validate_dataset()
    failed = report[report["Validation Result"] != "Pass"]
    if not failed.empty:
        raise SystemExit(f"Validation failed for {len(failed)} checks.")
    print("Validation passed.")
