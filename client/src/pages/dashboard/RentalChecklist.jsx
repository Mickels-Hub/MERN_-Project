import { useState, useEffect } from 'react';

const TASKS = [
  { id: 'task-1', title: 'Choose Your Location', desc: 'Identify preferred neighborhoods, transport options, and nearby facilities.' },
  { id: 'task-2', title: 'Set Your Budget', desc: 'Establish an affordable rent budget including service charges.' },
  { id: 'task-3', title: 'Compare Shortlisted Properties', desc: 'Compare prices, features, and location quality side by side.' },
  { id: 'task-4', title: 'Confirm All Fees', desc: 'Confirm state rent, service charges, deposits, and landlord terms.' },
  { id: 'task-5', title: 'Arrange an Inspection', desc: 'Schedule physical or virtual inspection times with the landlord.' },
  { id: 'task-6', title: 'Review the Rental Agreement', desc: 'Read the proposed tenancy agreement carefully before payment.' },
];

export default function RentalChecklist() {
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    fetchChecklist();
  }, []);

  const fetchChecklist = async () => {
    try {
      const res = await fetch('/api/dashboard/checklist');
      const data = await res.json();
      if (data.success && data.tasks) {
        const mapped = {};
        data.tasks.forEach((t) => { mapped[t.taskId] = t.completed; });
        setCompletedTasks(mapped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (taskId) => {
    const nextState = !completedTasks[taskId];
    setCompletedTasks((prev) => ({ ...prev, [taskId]: nextState }));
    try {
      await fetch('/api/dashboard/checklist/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, completed: nextState }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / TASKS.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#102A43]">Rental Checklist</h1>
        <p className="text-[#64748B] text-sm mt-1">Stay organized as you search for your next home.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
        <div className="flex justify-between text-sm font-semibold text-[#102A43]">
          <span>Progress: {completedCount} of {TASKS.length} tasks completed</span>
          <span className="text-[#13865D] font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-3 bg-[#F5F7F5] rounded-full overflow-hidden">
          <div className="h-full bg-[#13865D] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        {TASKS.map((task) => {
          const isDone = !!completedTasks[task.id];
          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-5 rounded-2xl shadow-sm cursor-pointer border-2 transition-all flex items-start gap-4 ${
                isDone ? 'bg-[#D7F5E8]/40 border-[#13865D]/30' : 'bg-white border-transparent'
              }`}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => {}}
                className="mt-1 w-5 h-5 accent-[#13865D] cursor-pointer"
              />
              <div>
                <h3 className={`font-bold text-base ${isDone ? 'line-through text-[#13865D]' : 'text-[#102A43]'}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-[#64748B] mt-1">{task.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}