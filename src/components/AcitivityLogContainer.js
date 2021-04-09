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
        <div className="col-sm-auto">
          <h3>Activity Log</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-auto">
          <ul className="list-group">
            {MOCK_ACTIVITIES.map((activity) => {
              return (
                <li
                  key={activity.type + activity.variation}
                  className="list-group-item"
                >
                  <span>{activity.type}</span>{" "}
                  <span
                    className="text-secondary"
                    style={{ fontStyle: "italic" }}
                  >
                    {activity.variation}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
