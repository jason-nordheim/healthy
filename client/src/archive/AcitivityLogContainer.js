import { ManualActivityForm } from "../components/ManualActivityForm";

const MOCK_ACTIVITIES = [
  { type: "Running", variation: "Outdoors", category: "Cardio" },
  { type: "Running", variation: "Trail", category: "Cardio" },
  { type: "Running", variation: "Treadmill", category: "Cardio" },
  { type: "Walking", variation: "Outdoors", category: "Cardio" },
  { type: "Walking", variation: "Trail", category: "Cardio" },
  { type: "Walking", variation: "Treadmill", category: "Cardio" },
  { type: "Swimming", variation: "Open Water", category: "Cardio" },
  { type: "Swimming", variation: "Pool", category: "Cardio" },
  { type: "Stair Climber", variation: "Machine", category: "Cardio" },
  { type: "Rowing", variation: "Indoor", category: "Cardio" },
  { type: "Rowing", variation: "Outdoor", category: "Cardio" },
  { type: "Cycling", variation: "Indoor", category: "Cardio" },
  { type: "Cycling", variation: "Outdoor", category: "Cardio" },
];

export const ActivityLogContainer = () => {
  return (
    <>
      <div className="row">
        <span className="col-sm-4 text-end">
          <button className="btn btn-primary right">New</button>
        </span>
      </div>
      <ManualActivityForm />
    </>
  );
};
